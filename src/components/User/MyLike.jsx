import React from "react";
import { useState } from "react";
import styles from "./User.module.scss"
import CafeModal from "../Cafe/CafeModal";
import { useNavigate } from "react-router-dom";

function MyLike () {
    const navigate = useNavigate();
    const [likeStores, setLikeStores] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const [heartOnOff, setHeartOnOff] = useState(false);

    function handleOpenCafeModal(cafe) {
        setSelectedCafe(cafe); // 선택된 가게 정보를 상태 변수에 저장하여 모달을 엽니다.
      }

    function handleClick() {
        navigate('/map');
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
                <div className={styles.notWishContainer}>
                    <div className={styles.notWishText}>아직 찜한 가게가 없어요<br /><span className={styles.notWishText2}>착한 가게를 찾아볼까요?</span></div>
                    <button onClick={handleClick} className={styles.button}>내 주변 가게 찾기</button>
                </div>
                )}
            </div>

            {selectedCafe && (
                <CafeModal
                cafe={selectedCafe}
                closeModal={() => setSelectedCafe(null)}
                mapInstance={null}
                isModalOpen={true}
                heartOnOff={heartOnOff}
                setHeartOnOff={setHeartOnOff}
                />
            )}
        </div>
    )

}

export default MyLike;