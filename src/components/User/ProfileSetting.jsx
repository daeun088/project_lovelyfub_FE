import React from "react";
import styles from './Setting.module.scss';

function ProfileSetting(){
    return (
        <div className={styles.layout}>
            <div className={styles.pictureContainer}>
                <img className={styles.picture}/>
                <div className={styles.picSetting}>사진 수정</div>
            </div>

            <div className={styles.userInfo}>
                <div className = {styles.infoBlock}>
                    <div className={styles.nickname}>닉네임</div>
                    <input className={styles.inputBlock} placeholder="닉네임"/>
                </div>
                <div className = {styles.infoBlock}>
                    <div className={styles.nickname}>SNS ID</div>
                    <input className={styles.inputBlock} placeholder="SNS ID"/>
                </div>
            </div>
            <div className={styles.button}>수정완료</div>
        </div>
    )
}

export default ProfileSetting;