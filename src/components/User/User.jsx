import React, { useState, useEffect } from "react";
import styles from './User.module.scss';
import { useNavigate } from "react-router-dom";
import CafeModal from "../Cafe/CafeModal";
import MyActivity from "./MyActivity";
import MyLike from "./MyLike";


function User({userData}) {
    const navigate = useNavigate();
    const [likeStores, setLikeStores] = useState([]);
    const [heartOnOff, setHeartOnOff] = useState(false);
    const [activeTab, setActiveTab] = useState("activity");

  const renderView = () => {
    switch (activeTab) {
      case "activity":
        return <MyActivity />;
      case "favorite":
        return <MyLike />;
      // 추가적인 탭에 대한 case 추가 가능
      default:
        return null;
    }
  };

  function handleClick() {
    navigate('/user/setting');
}

    useEffect(() => {
        fetchUserInfo();
    }, []);

    async function fetchUserInfo() {
        try {
          let accessToken ='';
          const cookies = document.cookie.split(';');
          for(let i =0; i< cookies.length; i++){
            if(cookies[i].includes('AccessToken')){
              accessToken = cookies[i].replace('AccessToken=', '');
            }
          }
          const userApiUrl = `https://lovelyfub.com/mypage/profile`;
          const response = await fetch(userApiUrl, {
            method: "GET",
            headers: {
              Authorization: `${accessToken}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("사용자 정보를 가져오는데 실패했습니다.");
          }
      
          const data = await response.json();
          setLikeStores(data.likeStores); // 찜한 가게들의 목록을 저장
        } catch (error) {
          console.error("오류가 발생했습니다.", error);
        }
      }

    return (
        <div className={styles.layout}>
                <div className={styles.profile}>
                  {/* <img src={userData.picture} alt="pic" className={styles.profilepic}/> */}
                    <div className={styles.userInfo}>
                      <div className={styles.nickname}>{/*{userData.name}*/}닉네임</div>
                      <div className={styles.instaId}>{/*{userData.email}*/}@instagramid</div>
                    </div>
                    <div className={styles.setting}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={handleClick}>
                        <path d="M12.0122 2.75C12.7462 2.75846 13.4773 2.84326 14.1937 3.00304C14.5064 3.07279 14.7403 3.33351 14.7758 3.65196L14.946 5.17881C15.0231 5.87986 15.615 6.41084 16.3206 6.41158C16.5103 6.41188 16.6979 6.37238 16.8732 6.29483L18.2738 5.67956C18.5651 5.55159 18.9055 5.62136 19.1229 5.85362C20.1351 6.93464 20.8889 8.23115 21.3277 9.64558C21.4223 9.95058 21.3134 10.282 21.0564 10.4715L19.8149 11.3866C19.4607 11.6468 19.2516 12.06 19.2516 12.4995C19.2516 12.9389 19.4607 13.3521 19.8157 13.6129L21.0582 14.5283C21.3153 14.7177 21.4243 15.0492 21.3297 15.3543C20.8911 16.7685 20.1377 18.0649 19.1261 19.1461C18.9089 19.3783 18.5688 19.4483 18.2775 19.3206L16.8712 18.7045C16.4688 18.5284 16.0068 18.5542 15.6265 18.774C15.2463 18.9937 14.9933 19.3812 14.945 19.8177L14.7759 21.3444C14.741 21.6592 14.5122 21.9182 14.204 21.9915C12.7556 22.3361 11.2465 22.3361 9.79803 21.9915C9.48991 21.9182 9.26105 21.6592 9.22618 21.3444L9.05736 19.82C9.00777 19.3843 8.75434 18.998 8.37442 18.779C7.99451 18.56 7.5332 18.5343 7.1322 18.7094L5.72557 19.3256C5.43422 19.4533 5.09403 19.3833 4.87678 19.1509C3.86462 18.0685 3.11119 16.7705 2.6732 15.3548C2.57886 15.0499 2.68786 14.7186 2.94485 14.5293L4.18818 13.6133C4.54232 13.3531 4.75147 12.9399 4.75147 12.5005C4.75147 12.061 4.54232 11.6478 4.18771 11.3873L2.94516 10.4728C2.6878 10.2834 2.5787 9.95178 2.67337 9.64658C3.11212 8.23215 3.86594 6.93564 4.87813 5.85462C5.09559 5.62236 5.43594 5.55259 5.72724 5.68056L7.12762 6.29572C7.53056 6.47256 7.9938 6.44585 8.37577 6.22269C8.75609 6.00209 9.00929 5.61422 9.05817 5.17764L9.22824 3.65196C9.26376 3.33335 9.49786 3.07254 9.8108 3.00294C10.5281 2.84342 11.26 2.75865 12.0122 2.75ZM12.0124 4.2499C11.5583 4.25524 11.1056 4.29443 10.6578 4.36702L10.5489 5.34418C10.4471 6.25368 9.92003 7.06102 9.13042 7.51903C8.33597 7.98317 7.36736 8.03903 6.52458 7.66917L5.62629 7.27456C5.05436 7.96873 4.59914 8.75135 4.27852 9.59168L5.07632 10.1788C5.81513 10.7216 6.25147 11.5837 6.25147 12.5005C6.25147 13.4172 5.81513 14.2793 5.0771 14.8215L4.27805 15.4102C4.59839 16.252 5.05368 17.0361 5.626 17.7316L6.53113 17.3351C7.36923 16.9692 8.33124 17.0227 9.12353 17.4794C9.91581 17.9361 10.4443 18.7417 10.548 19.6526L10.657 20.6365C11.5466 20.7878 12.4555 20.7878 13.3451 20.6365L13.4541 19.6527C13.5549 18.7421 14.0828 17.9337 14.876 17.4753C15.6692 17.0168 16.6332 16.963 17.4728 17.3305L18.3772 17.7267C18.949 17.0323 19.4041 16.2495 19.7247 15.409L18.9267 14.8211C18.1879 14.2783 17.7516 13.4162 17.7516 12.4995C17.7516 11.5827 18.1879 10.7206 18.9258 10.1785L19.7227 9.59109C19.4021 8.75061 18.9468 7.96784 18.3748 7.27356L17.4783 7.66737C17.113 7.82901 16.7178 7.9122 16.3187 7.91158C14.849 7.91004 13.6155 6.80355 13.4551 5.34383L13.3462 4.3667C12.9007 4.2942 12.4526 4.25512 12.0124 4.2499ZM11.9997 8.74995C14.0708 8.74995 15.7497 10.4289 15.7497 12.5C15.7497 14.571 14.0708 16.25 11.9997 16.25C9.92863 16.25 8.2497 14.571 8.2497 12.5C8.2497 10.4289 9.92863 8.74995 11.9997 8.74995ZM11.9997 10.25C10.7571 10.25 9.7497 11.2573 9.7497 12.5C9.7497 13.7426 10.7571 14.75 11.9997 14.75C13.2423 14.75 14.2497 13.7426 14.2497 12.5C14.2497 11.2573 13.2423 10.25 11.9997 10.25Z" fill="#212121"/>
                      </svg>
                    </div>
                </div>
                <div className={styles.lovelyScoreConteiner}>
                  <div className={styles.scoreConteiner}>
                    <div className={styles.scoreTitle}>이달의 러블리지수</div>
                    <div className={styles.lovelyScore}>0</div>
                  </div>
                  <div className={styles.scoreConteiner}>
                    <div className={styles.scoreBar}/>
                    <div className={styles.setting}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.8199 5.57912L11.9992 6.40163L11.1759 5.57838C9.07688 3.47931 5.67361 3.47931 3.57455 5.57838C1.47548 7.67744 1.47548 11.0807 3.57455 13.1798L11.4699 21.0751C11.7628 21.368 12.2377 21.368 12.5306 21.0751L20.432 13.1783C22.5264 11.0723 22.53 7.67857 20.4306 5.57912C18.3277 3.47623 14.9228 3.47623 12.8199 5.57912Z" fill="#FF6F3C"/>
                      </svg>
                    </div>
                  </div>
                </div>

            <div className={styles.bottomView}>
              <div className={styles.titleContainer}>
                <ul className={styles.titleBar}>
                  <li className={activeTab === "activity" ? styles.active : ""} onClick={() => setActiveTab("activity")}>나의 활동</li>
                  <li className={activeTab === "favorite" ? styles.active : ""} onClick={() => setActiveTab("favorite")}>
                    내가 찜한 착한 가게</li>
                </ul>        
              </div>

              <div>{renderView()}</div>
            </div>
            <a href="https://forms.gle/QNqfa8WcGrE89gTo8" className={styles.errorButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23 6.5C23 9.53757 20.5376 12 17.5 12C14.4624 12 12 9.53757 12 6.5C12 3.46243 14.4624 1 17.5 1C20.5376 1 23 3.46243 23 6.5ZM17.5 3C17.2239 3 17 3.22386 17 3.5V7.5C17 7.77614 17.2239 8 17.5 8C17.7761 8 18 7.77614 18 7.5V3.5C18 3.22386 17.7761 3 17.5 3ZM17.5 10.125C17.8452 10.125 18.125 9.84518 18.125 9.5C18.125 9.15482 17.8452 8.875 17.5 8.875C17.1548 8.875 16.875 9.15482 16.875 9.5C16.875 9.84518 17.1548 10.125 17.5 10.125ZM20.5 14.75V12.2678C21.051 11.9806 21.5557 11.6168 22 11.1904V14.75C22 16.5449 20.5449 18 18.75 18H13.0125L7.99868 21.7507C7.44585 22.1642 6.6625 22.0512 6.24901 21.4984C6.08736 21.2822 6 21.0196 6 20.7499L5.99921 18H5.25C3.45507 18 2 16.5449 2 14.75V6.25C2 4.45507 3.45507 3 5.25 3H12.0218C11.7253 3.46321 11.4858 3.96653 11.3135 4.5H5.25C4.2835 4.5 3.5 5.2835 3.5 6.25V14.75C3.5 15.7165 4.2835 16.5 5.25 16.5H7.49879L7.49986 20.2506L12.5135 16.5H18.75C19.7165 16.5 20.5 15.7165 20.5 14.75Z" fill="#212121"/>
            </svg>
                의견 및 오류제보
            </a>
        </div>
    )
}

export default User;