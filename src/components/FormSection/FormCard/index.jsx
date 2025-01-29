import styles from "./style.module.scss"

export const FormCard = ({children}) =>{
    return(
        <div className={styles.listItem}>
            {children}
        </div>
    )
}