import { useState } from "react"
import styles from "./style.module.scss"
import { FormCard } from "./FormCard"


export const FormSection = () =>{
    
    const taskListData = []
    const [taskList, setTaskList] = useState(taskListData)
  

    const [description, setDescription] = useState("")
    const [value, setValue] = useState(1)
    
    const [selectValue, setSelectValue] = useState("Entrada")
    const selectList = [
        {id:1 , name:"Entrada"},
        {id:2, name:"Despesa"},
    ]
    
    const submit = (e) =>{
        e.preventDefault()
        
        const task = {description,value, selectValue,id:crypto.randomUUID()}
        const newTaskList = [...taskList,task]
        setTaskList(newTaskList)
        

        setDescription("")
        setValue(1)
        setSelectValue("Entrada")
    }

    const removeTask = (removingId) =>{
        const newTaskList = taskList.filter(task =>task.id !== removingId)
        setTaskList(newTaskList)
    }
    
    const entrance = taskList.filter(task => task.selectValue === "Entrada")
    const totalEntrance = entrance.reduce((a,v) => a = a + v.value, 0)
    
    const expense = taskList.filter(task => task.selectValue === "Despesa")
    const totalExpense = expense.reduce((a,v) => a = a - v.value, 0)
    
    const totalValue = totalEntrance + totalExpense
    
    
    
    return (
      <section>
        <div className="container">
          <div className={styles.FlexBox}>
            <div className="container sm">
              <div>
                <form onSubmit={submit} className={styles.Form}>
                  <div>
                    <label className="paragraph">Descrição</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Digite aqui sua descrição"
                    />
                    <span>Ex: Compra de roupas</span>
                  </div>

                  <label className="paragraph">Valor (R$)</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                    placeholder="1"
                  />

                  <div>
                    <label className="paragraph">Tipo de valor</label>
                    <select
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {selectList.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit">Inserir Valor</button>
                </form>
              </div>
              <div>
                <div className={`${styles.FlexBox} ${styles.TotalValue}`}>
                  <div>
                    <h3 className="title">Valor total</h3>
                    <p className="paragraph">O valor se refere ao saldo</p>
                  </div>
                  <h4 className="title">{totalValue.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</h4>
                </div>
              </div>
            </div>

            <div className="container md">
              <ul className={styles.List}>
                <h3 className="title">Resumo financeiro</h3>
                <FormCard taskList={taskList}  removeTask={removeTask} />
                
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
}

