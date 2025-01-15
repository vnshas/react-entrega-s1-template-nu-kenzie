import styles from "./style.module.scss"

export const FormCard = ({taskList, removeTask}) =>{
    return(
        <div className={styles.listItem}>
            {taskList.map((task, index) => (
                <li key={index} className={task.selectValue === "Entrada" ? styles.entrance : styles.expense}>
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
        </div>
    )
}