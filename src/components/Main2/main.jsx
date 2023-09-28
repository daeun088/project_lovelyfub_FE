import React from 'react';
import styles from './main.module.scss';

function Main(){
    return(
        <div className={styles.layout}>
            <div className={styles.title}><span className={styles.textBold}>방문자 님,</span> <br/>러블리퍼브와 함께<br/>환경을 위해 참여해요.</div>

            <div className={styles.lovelyText}>이 달의 러블리</div>
            <div className={styles.lovelyContainer}>
                <img src={`/logo.png`} alt="lovely" className={styles.lovely}></img>
            </div>

            <div className={styles.feedContainer}>
                <div className={styles.profile}>
                    <img className={styles.profilePic} alt="profile"/>
                    <div className={styles.userInfo}>
                        <div className={styles.nickname}>길냥이좋아</div>
                        <div className={styles.nickname}><span className={styles.gray}>서울</span></div>
                    </div>
                    <div className={styles.time}>10분전 업로드</div>
                </div>

                <img src={`feed.jpeg`} alt="main" className={styles.feedImage}></img>
                
                <div className={styles.bottomBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M13.5686 5.57912L12.7479 6.40163L11.9246 5.57838C9.82561 3.47931 6.42234 3.47931 4.32328 5.57838C2.22421 7.67744 2.22421 11.0807 4.32328 13.1798L12.2186 21.0751C12.5115 21.368 12.9864 21.368 13.2793 21.0751L21.1807 13.1783C23.2751 11.0723 23.2787 7.67857 21.1793 5.57912C19.0764 3.47623 15.6715 3.47623 13.5686 5.57912ZM20.1171 12.1206L12.7489 19.4842L5.38394 12.1191C3.87065 10.6058 3.87065 8.15232 5.38394 6.63904C6.89722 5.12575 9.35073 5.12575 10.864 6.63904L12.2214 7.99648C12.5193 8.29435 13.004 8.28854 13.2946 7.98363L14.6293 6.63978C16.1464 5.12268 18.6015 5.12268 20.1186 6.63978C21.6323 8.15343 21.6297 10.5997 20.1171 12.1206Z" fill="#313131"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.12006 20.1281 10.5322 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill="#212121"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill="none" className={styles.bookmark}>
                        <path d="M6.96481 24.5865C6.40665 24.9882 5.6283 24.5892 5.6283 23.9016V7.03125C5.6283 5.01195 7.26525 3.375 9.28455 3.375H17.7202C19.7395 3.375 21.3765 5.01195 21.3765 7.03125V23.9016C21.3765 24.5892 20.5981 24.9882 20.04 24.5865L13.5024 19.883L6.96481 24.5865ZM19.689 7.03125C19.689 5.94394 18.8075 5.0625 17.7202 5.0625H9.28455C8.19723 5.0625 7.3158 5.94394 7.3158 7.03125V22.2552L13.0096 18.1586C13.304 17.9469 13.7008 17.9469 13.9951 18.1586L19.689 22.2552V7.03125Z" fill="#212121"/>
                    </svg>
                </div>
                
                <div className={styles.score}>⭐⭐⭐⭐⭐</div>
                <div className={styles.feedText}>
                    <span className={styles.storeName}>가게이름</span><br/>채식은 처음인데 정말 맛있어요. <br/>채식이라고 하면 맛이 없을 것 같단 <br/>편견이 있었는데 그걸 깨준 식당입니다. <br/>정말 추천해요
                </div>

                <div className={styles.coment}>
                    <div className={styles.comentText}>댓글쓰기</div>
                </div>
            </div>

            
        </div>
    )
}

export default Main;