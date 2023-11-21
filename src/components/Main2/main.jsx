import React, { useState, useEffect} from 'react';
import styles from './main.module.scss';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../Layout/Header/Login/LoginContext';
import LoginModal from'../Layout/Header/Login/Modal';



function Main(){
  const navigate = useNavigate();
    const {isLoggedIn} = useLoginContext();
    const [modalState, setModalState] = useState(false);
    const [loginModalState, setLoginModalState] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [userData, setUserData] = useState(null);

    const openModal = (modal) => {
      setCurrentModal(modal);
    };
  
    const closeModal = () => {
      setCurrentModal(null);
    };

    function handleClick(userId) {
      navigate(`/user/profile/${userId}`);
    }
  
    function onOffModal() {
      if (!isLoggedIn) {
        openModal(<LoginModal setModalState={setLoginModalState} onLoginSuccess={closeModal} />);
      } else {
        setModalState(!modalState);
      }
    }

    useEffect(() => {
      // Fetch user data when the component mounts
      fetchUserData();
    }, []);
  
    const fetchUserData = async () => {
      try {
        // Make an API call to fetch user data
        const response = await fetch('https://lovelyfub.com/main'); // Replace with your actual API endpoint
        const data = await response.json();
  
        // Set the user data in the state
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const closeModalOnBackgroundClick = (e) => {
        // 배경 클릭 시에만 모달이 닫히도록 처리
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };
    
    return(
        <div className={styles.layout}>
            <div className={styles.title}><span className={styles.textBold}>방문자 님,</span> <br/>러블리퍼브와 함께<br/>환경을 위해 참여해요.</div>

            <div className={styles.lovelyText}>이 달의 러블리</div>
            <div >
            {userData && (
              <div className={styles.lovelyContainer}>
                {userData.map((user) => (
                  <div key={user.id} onClick={() => handleClick(user.id)}>
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt={`Profile ${user.id}`}
                        className={styles.lovely}
                        onError={(e) => {
                          e.target.src = 'fallback_image_url.png'; // Replace with a fallback image URL
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            </div>




            <div className={styles.containerLayout}>
            <div className={styles.feedContainer}>
                <div className={styles.profile}>
                    <img className={styles.profilePic} alt="profile"/>
                    <div className={styles.userInfo}>
                        <div className={styles.nickname}>길냥이좋아</div>
                        <div className={styles.nickname}><span className={styles.gray}>가게이름</span></div>
                    </div>
                    <div className={styles.time}>10분전 업로드</div>
                </div>

                <img src={`feed.jpeg`} alt="main" className={styles.feedImage}></img>
                
                <div className={styles.bottomBar}>
                    <svg onClick={() => onOffModal()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M13.5686 5.57912L12.7479 6.40163L11.9246 5.57838C9.82561 3.47931 6.42234 3.47931 4.32328 5.57838C2.22421 7.67744 2.22421 11.0807 4.32328 13.1798L12.2186 21.0751C12.5115 21.368 12.9864 21.368 13.2793 21.0751L21.1807 13.1783C23.2751 11.0723 23.2787 7.67857 21.1793 5.57912C19.0764 3.47623 15.6715 3.47623 13.5686 5.57912ZM20.1171 12.1206L12.7489 19.4842L5.38394 12.1191C3.87065 10.6058 3.87065 8.15232 5.38394 6.63904C6.89722 5.12575 9.35073 5.12575 10.864 6.63904L12.2214 7.99648C12.5193 8.29435 13.004 8.28854 13.2946 7.98363L14.6293 6.63978C16.1464 5.12268 18.6015 5.12268 20.1186 6.63978C21.6323 8.15343 21.6297 10.5997 20.1171 12.1206Z" fill="#313131"/>
                    </svg>
                    <svg onClick={() => onOffModal()} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.12006 20.1281 10.5322 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill="#212121"/>
                    </svg>
                    <svg onClick={() => onOffModal()}xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 27" fill={modalState ? "#FFA500" : "none"} className={styles.bookmark}>
                        <path d="M6.96481 24.5865C6.40665 24.9882 5.6283 24.5892 5.6283 23.9016V7.03125C5.6283 5.01195 7.26525 3.375 9.28455 3.375H17.7202C19.7395 3.375 21.3765 5.01195 21.3765 7.03125V23.9016C21.3765 24.5892 20.5981 24.9882 20.04 24.5865L13.5024 19.883L6.96481 24.5865ZM19.689 7.03125C19.689 5.94394 18.8075 5.0625 17.7202 5.0625H9.28455C8.19723 5.0625 7.3158 5.94394 7.3158 7.03125V22.2552L13.0096 18.1586C13.304 17.9469 13.7008 17.9469 13.9951 18.1586L19.689 22.2552V7.03125Z" fill="#212121"/>
                    </svg>
                    {currentModal && (
                        <div
                        onClick={closeModalOnBackgroundClick}
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
                        {currentModal}
                      </div>
                    )}
                    {modalState &&<Modal isOpen={modalState} onClose={onOffModal} />}
                </div>
                
                <div className={styles.score}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M7.18964 0.884997C7.49134 -0.0313721 8.78763 -0.0313741 9.08933 0.884995L10.3019 4.56804C10.437 4.97818 10.82 5.25532 11.2518 5.25532H15.1474C16.1194 5.25532 16.52 6.50166 15.7302 7.068L12.6013 9.31145C12.2462 9.56608 12.0975 10.0218 12.2341 10.4369L13.4346 14.0831C13.7372 15.0021 12.6883 15.7723 11.9021 15.2085L8.72219 12.9285C8.37387 12.6787 7.90511 12.6787 7.55678 12.9285L4.37691 15.2085C3.59062 15.7723 2.54179 15.0021 2.84436 14.0831L4.04482 10.4369C4.18147 10.0218 4.03281 9.56608 3.67769 9.31145L0.54882 7.068C-0.241039 6.50166 0.159611 5.25532 1.13153 5.25532H5.0272C5.45899 5.25532 5.84202 4.97818 5.97705 4.56804L7.18964 0.884997Z" fill="#FFC93C"/>
                </svg>
                </div>
                <div className={styles.feedText}>
                    채식은 처음인데 정말 맛있어요. <br/>채식이라고 하면 맛이 없을 것 같단 <br/>편견이 있었는데 그걸 깨준 식당입니다. <br/>정말 추천해요
                </div>

                <div className={styles.comment}>
                    <div className={styles.commentNickname}>닉네임</div>
                    <div className={styles.commentText}>댓글내용댓글내용</div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Main;