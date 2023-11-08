import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import styles from './Menu.module.scss'
import { useState } from 'react';
import { useLoginContext } from '../Header/Login/LoginContext';
import Modal from '../Header/Login/Modal';

const Menu = () => {
    const location = useLocation();
    const [modalState, setModalState] = useState(false);
    const {isLoggedIn} = useLoginContext();
    const navigate = useNavigate();

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
    }

    const handleMyPageClick = (e) => {
        e.preventDefault(); // 기본 이동 막기
    
        if (!isLoggedIn) {
            openModal(); // 모달 열기
        } else {
            navigate('/user/mypage'); // 로그인 상태라면 mypage로 이동
        }
    }

    return (
        <header>
            <div className={styles.menubar}>
                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <NavLink exact to="/main">
                            {location.pathname === '/main' ? 
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M13.9508 2.53318C13.1128 1.82618 11.8872 1.82618 11.0492 2.53318L4.29916 8.22772C3.79241 8.65523 3.5 9.28447 3.5 9.94747V19.2526C3.5 20.2191 4.2835 21.0026 5.25 21.0026H8.25C9.2165 21.0026 10 20.2191 10 19.2526V15.25C10 14.5707 10.5418 14.018 11.2169 14.0004H13.7831C14.4582 14.018 15 14.5707 15 15.25V19.2526C15 20.2191 15.7835 21.0026 16.75 21.0026H19.75C20.7165 21.0026 21.5 20.2191 21.5 19.2526V9.94747C21.5 9.28447 21.2076 8.65523 20.7008 8.22772L13.9508 2.53318Z" fill="#FF6F3C"/>
                                </svg>): 
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M11.0495 2.53189C11.8874 1.82531 13.1126 1.82531 13.9505 2.5319L20.7005 8.224C21.2074 8.65152 21.5 9.2809 21.5 9.94406V19.2539C21.5 20.2204 20.7165 21.0039 19.75 21.0039H16.25C15.2835 21.0039 14.5 20.2204 14.5 19.2539V14.2468C14.5 14.1088 14.3881 13.9968 14.25 13.9968H10.75C10.6119 13.9968 10.5 14.1088 10.5 14.2468V19.2539C10.5 20.2204 9.7165 21.0039 8.75 21.0039H5.25C4.2835 21.0039 3.5 20.2204 3.5 19.2539V9.94406C3.5 9.2809 3.79255 8.65152 4.29952 8.224L11.0495 2.53189ZM12.9835 3.6786C12.7042 3.44307 12.2958 3.44307 12.0165 3.6786L5.26651 9.37071C5.09752 9.51321 5 9.72301 5 9.94406V19.2539C5 19.392 5.11193 19.5039 5.25 19.5039H8.75C8.88807 19.5039 8.99999 19.392 8.99999 19.2539V14.2468C8.99999 13.2803 9.7835 12.4968 10.75 12.4968H14.25C15.2165 12.4968 16 13.2803 16 14.2468V19.2539C16 19.392 16.1119 19.5039 16.25 19.5039H19.75C19.8881 19.5039 20 19.392 20 19.2539V9.94406C20 9.72301 19.9025 9.51321 19.7335 9.37071L12.9835 3.6786Z" fill="#313131"/>
                                </svg>)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/store">
                            {location.pathname === '/store' ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M18 2.75C18 2.33579 17.6642 2 17.25 2C16.8358 2 16.5 2.33579 16.5 2.75V6.76477C14.474 5.40741 11.6329 5.88353 10.2065 7.97968L2.85306 18.7861C2.29669 19.6038 2.40361 20.6966 3.10816 21.3936C3.82281 22.1005 4.94736 22.1979 5.77537 21.6247L16.5644 14.1552C18.6214 12.7311 19.0757 9.97752 17.7407 8H21.75C22.1642 8 22.5 7.66421 22.5 7.25C22.5 6.83579 22.1642 6.5 21.75 6.5H19.0603L22.2806 3.28038C22.5735 2.98752 22.5736 2.51265 22.2807 2.21972C21.9879 1.9268 21.513 1.92675 21.2201 2.21962L18 5.43904V2.75Z" fill="#FF6F3C"/>
                                </svg>):
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M18 2.75C18 2.33579 17.6642 2 17.25 2C16.8358 2 16.5 2.33579 16.5 2.75V6.76355C14.4741 5.40779 11.6344 5.88428 10.2085 7.97976L2.85501 18.7862C2.29865 19.6038 2.40557 20.6967 3.11011 21.3936C3.82476 22.1006 4.94932 22.198 5.77733 21.6247L16.5663 14.1553C18.6234 12.7311 19.0776 9.97753 17.7426 8H21.75C22.1642 8 22.5 7.66421 22.5 7.25C22.5 6.83579 22.1642 6.5 21.75 6.5H19.0604L22.2806 3.28038C22.5735 2.98752 22.5736 2.51265 22.2807 2.21972C21.9879 1.9268 21.513 1.92675 21.2201 2.21962L18 5.43903V2.75ZM11.4596 8.81278C12.5219 7.25159 14.7605 7.0373 16.1058 8.368C17.4352 9.68305 17.2418 11.8667 15.7015 12.9331L4.91255 20.4025C4.68406 20.5607 4.37373 20.5338 4.17652 20.3388C3.9821 20.1465 3.9526 19.8449 4.10613 19.6192L11.4596 8.81278Z" fill="#313131"/>
                                </svg>)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/map">
                                {location.pathname === '/map' ? 
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M18.6568 16.8819L17.4698 18.0558C16.5949 18.9144 15.4598 20.0184 14.0639 21.3679C13.1917 22.2113 11.8079 22.2112 10.9358 21.3677L7.44466 17.9718C7.0059 17.541 6.63863 17.1777 6.34279 16.8819C2.94238 13.4815 2.94238 7.9683 6.34279 4.56789C9.7432 1.16748 15.2564 1.16748 18.6568 4.56789C22.0572 7.9683 22.0572 13.4815 18.6568 16.8819ZM15 10.9996C15 9.61875 13.8806 8.49936 12.4998 8.49936C11.119 8.49936 9.99958 9.61875 9.99958 10.9996C9.99958 12.3804 11.119 13.4998 12.4998 13.4998C13.8806 13.4998 15 12.3804 15 10.9996Z" fill="#FF6F3C"/>
                                </svg>):
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M6.34279 4.56789C9.7432 1.16748 15.2564 1.16748 18.6568 4.56789C22.0572 7.9683 22.0572 13.4815 18.6568 16.8819L17.4698 18.0558C16.5949 18.9144 15.4598 20.0184 14.0639 21.3679C13.1917 22.2113 11.8079 22.2112 10.9358 21.3677L7.44466 17.9718C7.0059 17.541 6.63863 17.1777 6.34279 16.8819C2.94238 13.4815 2.94238 7.9683 6.34279 4.56789ZM17.5961 5.62855C14.7815 2.81392 10.2181 2.81392 7.40345 5.62855C4.58882 8.44317 4.58882 13.0066 7.40345 15.8212L8.89052 17.2887C9.70943 18.0901 10.7389 19.0905 11.9786 20.2895C12.2693 20.5706 12.7305 20.5707 13.0213 20.2896L16.4162 16.9881C16.8851 16.5278 17.2785 16.1388 17.5961 15.8212C20.4107 13.0066 20.4107 8.44317 17.5961 5.62855ZM12.4998 7.99854C14.1575 7.99854 15.5013 9.34238 15.5013 11.0001C15.5013 12.6578 14.1575 14.0016 12.4998 14.0016C10.8421 14.0016 9.49823 12.6578 9.49823 11.0001C9.49823 9.34238 10.8421 7.99854 12.4998 7.99854ZM12.4998 9.49854C11.6705 9.49854 10.9982 10.1708 10.9982 11.0001C10.9982 11.8294 11.6705 12.5016 12.4998 12.5016C13.3291 12.5016 14.0013 11.8294 14.0013 11.0001C14.0013 10.1708 13.3291 9.49854 12.4998 9.49854Z" fill="#313131"/>
                                </svg>)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/mypage" onClick={handleMyPageClick}>
                                {location.pathname === '/user/mypage' ? 
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" >
                                    <path d="M18.2545 14.0002C19.4966 14.0002 20.5034 15.007 20.5034 16.2491V17.1675C20.5034 17.7409 20.3242 18.2999 19.9908 18.7664C18.4449 20.9296 15.9206 22.0013 12.5004 22.0013C9.0794 22.0013 6.55643 20.9292 5.01427 18.7648C4.68231 18.2989 4.50391 17.7411 4.50391 17.169V16.2491C4.50391 15.007 5.51076 14.0002 6.75278 14.0002H18.2545ZM12.5004 2.00488C15.2618 2.00488 17.5004 4.24346 17.5004 7.00488C17.5004 9.76631 15.2618 12.0049 12.5004 12.0049C9.73894 12.0049 7.50036 9.76631 7.50036 7.00488C7.50036 4.24346 9.73894 2.00488 12.5004 2.00488Z" fill="#FF6F3C"/>
                                </svg>) :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" >
                                    <path d="M18.2545 14.0002C19.4966 14.0002 20.5034 15.007 20.5034 16.2491V16.8245C20.5034 17.7188 20.1838 18.5836 19.6023 19.263C18.0329 21.0965 15.6457 22.0013 12.5004 22.0013C9.3545 22.0013 6.96849 21.0962 5.40219 19.2619C4.82242 18.583 4.50391 17.7195 4.50391 16.8267V16.2491C4.50391 15.007 5.51076 14.0002 6.75278 14.0002H18.2545ZM18.2545 15.5002H6.75278C6.33919 15.5002 6.00391 15.8355 6.00391 16.2491V16.8267C6.00391 17.3624 6.19502 17.8805 6.54287 18.2878C7.79618 19.7555 9.76206 20.5013 12.5004 20.5013C15.2387 20.5013 17.2063 19.7555 18.4627 18.2876C18.8117 17.8799 19.0034 17.361 19.0034 16.8245V16.2491C19.0034 15.8355 18.6681 15.5002 18.2545 15.5002ZM12.5004 2.00488C15.2618 2.00488 17.5004 4.24346 17.5004 7.00488C17.5004 9.76631 15.2618 12.0049 12.5004 12.0049C9.73894 12.0049 7.50036 9.76631 7.50036 7.00488C7.50036 4.24346 9.73894 2.00488 12.5004 2.00488ZM12.5004 3.50488C10.5674 3.50488 9.00036 5.07189 9.00036 7.00488C9.00036 8.93788 10.5674 10.5049 12.5004 10.5049C14.4334 10.5049 16.0004 8.93788 16.0004 7.00488C16.0004 5.07189 14.4334 3.50488 12.5004 3.50488Z" fill="#313131"/>
                                </svg>)}

                                {modalState && !isLoggedIn && (
                                    <div
                                        style={{
                                        display: "flex",
                                        position: "fixed",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        right: "0",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: "100",
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        <Modal setModalState={setModalState} onLoginSuccess={closeModal} />
                                    </div>
                                    )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.plusbutton}>
                <button>    
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.7498 3C12.1295 3 12.4434 3.28201 12.4931 3.64808L12.5 3.74985L12.5012 11H19.7543C20.1685 11 20.5043 11.3358 20.5043 11.75C20.5043 12.1297 20.2221 12.4435 19.8561 12.4932L19.7543 12.5H12.5012L12.5032 19.7491C12.5033 20.1633 12.1676 20.4993 11.7534 20.4993C11.3737 20.4993 11.0598 20.2173 11.0101 19.8512L11.0032 19.7494L11.0012 12.5H3.7522C3.33798 12.5 3.0022 12.1642 3.0022 11.75C3.0022 11.3703 3.28435 11.0565 3.65043 11.0068L3.7522 11H11.0012L11 3.75015C10.9999 3.33594 11.3356 3 11.7498 3Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Menu