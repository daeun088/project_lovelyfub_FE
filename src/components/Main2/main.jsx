import React from 'react';
import styles from './main.module.scss';

function Main(){
    return(
        <div>
            <div className={styles.title}><span className={styles.textBold}>방문자 님,</span> <br/>러블리퍼브와 함께<br/>환경을 위해 참여해요.</div>

            <div className={styles.lovelyText}>이 달의 러블리</div>
            <div className={styles.lovelyContainer}>
                <img src={`/logo.png`} alt="lovely" className={styles.lovely}></img>
            </div>

            <div className={styles.feedContainer}>
                <div className={styles.profile}>
                    <img className={styles.profilePic}/>
                    <div className={styles.userInfo}>
                        <div className={styles.nickname}>길냥이좋아</div>
                        <div className={styles.nickname}><span className={styles.gray}>서울</span></div>
                    </div>
                    <div className={styles.time}>10분전 업로드</div>
                </div>

                <img src={`feed.jpeg`} alt="main" className={styles.feedImage}></img>
                
                


            </div>

            
        </div>
    )
}

export default Main;