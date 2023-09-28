import React, { useState, useEffect, useRef } from "react";
import styles from "./Store.module.scss";
//import CafeModal from "./CafeModal";
import axios from "axios";

function Store() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const mapElement = useRef(null);
  const mapInstance = useRef(null);


  useEffect(() => {
    axios
      .get("https://lovelyfub.com/store?page=1&size=30")
      .then((response) => {
          const storeData = response.data.data.map((store) => {
            return {
              id: store.storeid,
              name: store.name,
              profile: store.profile,
              description: store.introduction,
              category: store.category,
              usertype: store.usertype,
            };
          });
          setData(storeData);
        })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // Create or update the map instance
    if (!mapInstance.current) {
      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new naver.maps.LatLng(37.5656, 126.9769);
      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: false,
      };
      mapInstance.current = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: mapInstance.current,
      });
    } else {

      const location = new naver.maps.LatLng(37.5656, 126.9769);
      mapInstance.current.setCenter(location);
      mapInstance.current.markers[0].setPosition(location);
    }
  }, [isModalOpen]);

  useEffect(() => {
    // Clean up the map instance when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleItemClick = (storeId) => {
    axios
      .get(`https://lovelyfub.com/store/${storeId}`)
      .then((response) => {
        setSelectedStore(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching item:", error));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>푸드리퍼브 재료로<br />음식을 만드는 식당이에요</div>
      <div className={styles.cafeContainer}>
      {data.map((store) => (
        <div key={store.id} className={styles.cafeList} onClick={() => handleItemClick(store.id)}>
          <img src={`/푸드리퍼브 가게 프로필/${store.profile}`}
            alt="store" className={styles.productImage}/>
          <div className={styles.productTitle}>{store.name}</div>
          <div className={styles.productText}>{store.description}</div>
          </div>
      ))}
      </div>

      
    </div>
  );
}

export default Store;
