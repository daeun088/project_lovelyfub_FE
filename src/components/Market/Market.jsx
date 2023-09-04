import React, { useState, useEffect, useRef } from "react";
import styles from "./Market.module.scss";
import MarketModal from "./MarketModal";
import axios from "axios";

function Market() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [market, setMarket] = useState([]);

  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const [selectedMarket, setSelectedMarket] = useState(null);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    axios
      .get("https://lovelyfub.com/market?page=1&size=30")
      .then((response) => {
        const extractedMarkets = response.data.data.map((market) => {
          return {
            id: market.storeid,
            name: market.name,
            profile: market.profile,
            description: market.introduction,
            // Add other necessary fields as needed
          };
        });
        setMarket(extractedMarkets);
      })
      .catch((error) => console.error("Error fetching markets:", error));
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

  const handleMarketClick = (marketId) => {
    axios
      .get(`https://lovelyfub.com/store/${marketId}`)
      .then((response) => {
        setSelectedMarket(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching market:", error));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>푸드리퍼브 재료를<br />판매하는 마켓이에요</div>

      <div className={styles.cafeContainer}>
        {market.map((market) => (
          <div key={market.id} className={styles.cafeList} onClick={() => handleMarketClick(market.id)}>
            <img src={`/푸드리퍼브 가게 프로필/${market.profile}`} alt="market" className={styles.productImage} />
            <div className={styles.productTitle}>{market.name}</div>
            <div className={styles.productText}>{market.description}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <MarketModal
          closeModal={handleCloseModal}
          mapInstance={mapInstance}
          market={selectedMarket}
          isModalOpen = {isModalOpen}
        />
      )}
    </div>
  );
}

export default Market;