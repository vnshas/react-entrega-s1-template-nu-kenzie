import { useState } from "react"
import styles from "./style.module.scss"



export const FormSection = () =>{
    
    const taskListData = []
    const [taskList, setTaskList] = useState(taskListData)


    const [description, setDescription] = useState("")
    const [value, setValue] = useState(1)

    const submit = (e) =>{
        e.preventDefault()
        
        const task = {description,value, selectValue}
        const newTask = {...task, id:crypto.randomUUID()}
        const newTaskList = [...taskList,newTask]
        console.log(newTaskList)
        setTaskList(newTaskList)
        setDescription("")
        setValue(1)
        setSelectValue("Entrada")
    }

    const removeTask = (removingId) =>{
        const newTaskList = taskList.filter(task =>task.id !== removingId)
        setTaskList(newTaskList)
    }
    
    
    const [selectValue, setSelectValue] = useState("Entrada")
    const selectList = [
        {id:1 , name:"Entrada"},
        {id:2, name:"Despesa"},
    ]
    
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
              <div className="container sm">
                <div className={`${styles.FlexBox} ${styles.TotalValue}`}>
                  <div>
                    <h3 className="title">Valor total</h3>
                    <p className="paragraph">O valor se refere ao saldo</p>
                  </div>
                  <h3 className="title">{taskList.reduce((a,v) => a = a + v.value, 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</h3>
                </div>
              </div>
            </div>

            <div className="container md">
              <ul className={styles.List}>
                <h3 className="title">Resumo financeiro</h3>
                {taskList.map((task, index) => (
                    <li key={index}>
                    <div>
                      <h3 className="title">{task.description}</h3>
                      <p className="paragraph">{task.selectValue}</p>
                    </div>
                    <div>
                      <span className="paragraph">{task.value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</span>
                      <button onClick={() => removeTask(task.id)}>Excluir</button>
                    </div>
                  </li>
                ))}
                
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
}