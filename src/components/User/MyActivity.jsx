import React from "react";
import { useState } from "react";
import styles from "./User.module.scss"
import { useNavigate } from "react-router-dom";

const MyActivity= ()=> {
    const navigate = useNavigate();
    const [likeStores, setLikeStores] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const [heartOnOff, setHeartOnOff] = useState(false);

    function handleOpenCafeModal(cafe) {
        setSelectedCafe(cafe); // 선택된 가게 정보를 상태 변수에 저장하여 모달을 엽니다.
      }

    function handleClick() {
        navigate('/content');
    }

    return (
        <div>
            <div>
            {likeStores && likeStores.length > 0 ? (
                    <div className={styles.cafeContainer}>
                    {likeStores.map((store) => (
                      <div key={store.storeid} className={styles.cafeList} onClick={() => handleOpenCafeModal(store)}>
                        {/* 찜한 가게 정보 표시 (이미지, 이름 등) */}
                        <img src={`/푸드리퍼브 가게 프로필/${store.profile}`} alt="store" className={styles.productImage} />
                        <div className={styles.productTitle}>{store.name}</div>
                        <div className={styles.productText}>{store.introduction}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                    /*
                <div className={styles.notWishContainer}>
                    <div className={styles.notWishText}>아직 나의 활동이 없어요<br /><span className={styles.notWishText2}>리뷰를 적어볼까요?</span></div>
                    <button onClick={handleClick} className={styles.button}>리뷰 적기</button>
                </div>*/
                <div className={styles.bigContainer}>
                <div className={styles.contentContainer}>
                  <div className={styles.subTitle}>내가 작성한 게시물 </div>
                  <div className={styles.gridContainer}>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                  </div>
                  <div className={styles.more}>+더보기</div>
                </div>

                <div className={styles.contentContainer}>
                  <div className={styles.subTitle}>내가 찜한 게시물 </div>
                  <div className={styles.gridContainer}>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
                    
                  </div>
                </div>
                </div>
                )}
            </div>
        </div>

    )
}

export default MyActivity;