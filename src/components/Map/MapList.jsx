import React, { useState } from "react";
import styles from "./MapList.module.scss";
import CafeModal from "../Cafe/CafeModal";
import axios from "axios";

function MapList({ restaurantList }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heartOnOff, setHeartOnOff] = useState(false);

  const handleCafeClick = (cafeId) => {
    axios
      .get(`https://lovelyfub.com/store/${cafeId}`)
      .then((response) => {
        setSelectedRestaurant(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching cafe:", error));
  };

  if (!restaurantList) {
    // restaurantList가 undefined인 경우 로딩 상태를 표시하거나 원하는 처리를 추가합니다.
    return <div className={styles.loading}></div>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.title}>지금 내 주변에 있는 가게 모음</div>
  
      {restaurantList.length > 0 ? (
        <div className={styles.cafeContainer}>
          {restaurantList.map((restaurant) => (
            <div
              className={styles.cafeList}
              key={restaurant.storeid}
              onClick={() => handleCafeClick(restaurant.storeid)}
            >
              <img
                src={`/푸드리퍼브 가게 프로필/${restaurant.profile}`}
                className={styles.productImage}
                alt={restaurant.name}
              />
              <div className={styles.productTitle}>{restaurant.name}</div>
              <div className={styles.productText}>{restaurant.introduction}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.nonStore}>주변 가게가 존재하지 않습니다.</div>
      )}
  
      {isModalOpen && (
        <CafeModal
        cafe={selectedRestaurant}
        closeModal={() => setIsModalOpen(false)}
        mapInstance={null}
        isModalOpen={true}
        heartOnOff={heartOnOff}
        setHeartOnOff={setHeartOnOff}
      />
      )}
    </div>
  );
}

export default MapList;
