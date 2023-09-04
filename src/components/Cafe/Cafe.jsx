import React, { useState, useEffect, useRef } from "react";
import styles from "./Cafe.module.scss";
import CafeModal from "./CafeModal";
import axios from "axios";

function Cafe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cafes, setCafes] = useState([]);

  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [heartOnOff, setHeartOnOff] =useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://lovelyfub.com/cafe?page=1&size=30")
      .then((response) => {
        const extractedCafes = response.data.data.map((cafe) => {
          return {
            id: cafe.storeid,
            name: cafe.name,
            profile: cafe.profile,
            description: cafe.introduction,
            // Add other necessary fields as needed
          };
        });
        setCafes(extractedCafes);
      })
      .catch((error) => console.error("Error fetching cafes:", error));
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

  const handleCafeClick = (cafeId) => {
    axios
      .get(`https://lovelyfub.com/store/${cafeId}`)
      .then((response) => {
        setSelectedCafe(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching cafe:", error));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>푸드리퍼브 재료로<br />음식을 만드는 식당이에요</div>

      <div className={styles.cafeContainer}>
        {cafes.map((cafe) => (
          <div key={cafe.id} className={styles.cafeList} onClick={() => handleCafeClick(cafe.id)}>
            <img src={`/푸드리퍼브 가게 프로필/${cafe.profile}`} alt="Cafe Profile" className={styles.productImage} />
            <div className={styles.productTitle}>{cafe.name}</div>
            <div className={styles.productText}>{cafe.description}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CafeModal
          closeModal={handleCloseModal}
          mapInstance={mapInstance}
          cafe={selectedCafe}
          isModalOpen = {isModalOpen}
          heartOnOff={heartOnOff}
          setHeartOnOff={setHeartOnOff}
        />
      )}
    </div>
  );
}

export default Cafe;