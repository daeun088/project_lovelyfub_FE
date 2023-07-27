import React, { forwardRef, useEffect, useRef } from "react";
import styles from './Modal.module.scss';

const Modal = forwardRef((props, ref) => {
    let wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            props.setModalState(false);
        }
    };

    function handleNaverLogin() {
        // 백엔드 API의 네이버 로그인 URL로 리다이렉션합니다.
        window.location.href = "http://ec2-3-39-210-13.ap-northeast-2.compute.amazonaws.com:8080/login";
    }

    return (
        <div ref={wrapperRef}>
            <div className={styles.modal}>
                <img src="logo.png" className={styles.logo} />
                <div className={styles.subText}>가벼운 푸드리퍼브의 시작,</div>
                <div className={styles.mainText}>러블리퍼브에 오신걸 환영해요</div>
                <button onClick={handleNaverLogin} className={styles.naverButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M5.33333 16.5H0V0.5H5L10.6667 8.67021V0.5H16V16.5H11.3333L5.33333 8.32979V16.5Z" fill="white" />
                    </svg>
                    네이버로 계속하기
                </button>
            </div>
        </div>
    );
});

export default Modal;
