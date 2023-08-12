import { NavLink, useLocation} from 'react-router-dom'
import styles from './Menu.module.scss'

const Menu = () => {
    const location = useLocation();

    return (
        <header>
            <div className={styles.menubar}>
                <nav className={styles.navigation}>
                    <ul>
                        <li className={location.pathname === '/main' ? styles.active : ''}>
                            <NavLink exact to="/main" activeClassName={styles.activeLink}>
                                <span className={location.pathname === '/main' ? styles.homeText : ''}>홈</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === '/cafe' ? styles.active : ''}>
                            <NavLink to="/cafe" activeClassName={styles.activeLink}>
                                <span className={location.pathname === '/cafe' ? styles.homeText : ''}>식당</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === '/market' ? styles.active : ''}>
                            <NavLink to="/market" activeClassName={styles.activeLink}>
                                <span className={location.pathname === '/market' ? styles.homeText : ''}>마켓</span>
                            </NavLink>
                        </li>
                        <li className={location.pathname === '/map' ? styles.active : ''}>
                            <NavLink to="/map" activeClassName={styles.activeLink}>
                                <span className={location.pathname === '/map' ? styles.homeText : ''}>내 주변 가게 찾기</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Menu