import React from 'react';
import styles from './Footer.module.scss';
import logo from './image/logo.png'

function Footer() {
    return (
        <div>
        <img src={logo} alt="logo" className={styles.image} />
        <dr/>
        <div className={styles.title}>
            <p><span className={styles.color}>러블리퍼브</span>와 함께 지구를 위한
        <br/> 친환경 여정에 동참해요</p></div>
        </div>
    )
}

export default Footer;