import Menu from "./Menu/Menu"
import styles from './layout.module.scss'


const Layout = (props) =>{
    return (
        <div className={styles.layout}>
            <div className={styles.content}>
                <Menu />
            </div>
            
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout