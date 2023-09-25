import React, { useState, useEffect, useRef } from "react";
import styles from "./Cafe.module.scss";
import CafeModal from "./CafeModal";
//import MarketModal from "../Market/MarketModal";
import axios from "axios";

function Cafe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const mapElement = useRef(null);
  const mapInstance = useRef(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch data for both Cafe and Market here and combine them
    axios
      .all([
        axios.get("https://lovelyfub.com/cafe?page=1&size=30"),
        axios.get("https://lovelyfub.com/market?page=1&size=30"),
      ])
      .then(
        axios.spread((cafeResponse, marketResponse) => {
          const cafeData = cafeResponse.data.data.map((cafe) => {
            return {
              id: cafe.storeid,
              name: cafe.name,
              profile: cafe.profile,
              description: cafe.introduction,
              type: "cafe",
            };
          });

          const marketData = marketResponse.data.data.map((market) => {
            return {
              id: market.storeid,
              name: market.name,
              profile: market.profile,
              description: market.introduction,
              type: "market",
            };
          });

          // Combine the data from both endpoints
          const combinedData = [...cafeData, ...marketData];

          setData(combinedData);
        })
      )
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
      // If the map instance already exists, just reposition the marker
      const location = new naver.maps.LatLng(37.5656, 126.9769);
      mapInstance.current.setCenter(location);
      mapInstance.current.markers[0].setPosition(location);
    }
  }, [isModalOpen]); // Run this effect whenever isModalOpen changes

  useEffect(() => {
    // Clean up the map instance when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleItemClick = (itemId) => {
    axios
      .get(`https://lovelyfub.com/store/${itemId}`)
      .then((response) => {
        setSelectedItem(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching item:", error));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>푸드리퍼브 재료로<br />음식을 만드는 식당이에요</div>
      <div className={styles.cafeContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.cafeList} onClick={() => handleItemClick(item.id)}>
          <img
            src={`/푸드리퍼브 가게 프로필/${item.profile}`}
            alt={item.type === "cafe" ? "Cafe Profile" : "Market Profile"}
            className={styles.productImage}
          />
          <div className={styles.productTitle}>{item.name}</div>
          <div className={styles.productText}>{item.description}</div>
          </div>
      ))}
      </div>

      {isModalOpen && (
        // Render appropriate modal based on selectedItem.type
          <CafeModal
            closeModal={handleCloseModal}
            mapInstance={mapInstance}
            cafe={selectedItem}
            isModalOpen={isModalOpen}
          />
      )}
    </div>
  );
}

export default Cafe;
