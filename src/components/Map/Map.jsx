import React, { useEffect, useRef, useState } from "react";
import styles from './Map.module.scss';
import MapList from "./MapList";
import axios from "axios";
import CafeModal from "../Cafe/CafeModal";

function Map() {
  const mapElement = useRef(null);
  const { naver } = window;

  const [myLocation] = useState({
    latitude: 37.512157,
    longitude: 126.926690
  });

  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [heartOnOff, setHeartOnOff] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapInstance = useRef(null);


  function handleOpenCafeModal(restaurant) {
    setSelectedRestaurant(restaurant); // 선택된 가게 정보를 상태 변수에 저장하여 모달을 엽니다.
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMarkerClick = (cafeId) => {
    axios
      .get(`http://ec2-3-39-210-13.ap-northeast-2.compute.amazonaws.com:8080/store/${cafeId}`)
      .then((response) => {
        setSelectedRestaurant(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching cafe:", error));
  };

  useEffect(() => {
    if (myLocation&&mapElement.current) {
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: false, minZoom: 15, maxZoom: 20,
      });

      // 현재 위치를 표시할 뾰족한 마커 아이콘
      const currentMarkerIcon = {
        content: `
          <div style="width: 20px; height: 20px; border: 2px solid white; background-color: blue; border-radius: 50%;"></div>
        `,
        anchor: new naver.maps.Point(10, 10),
      };

      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map,
        icon: currentMarkerIcon,
      });

      fetchRestaurants(myLocation.latitude, myLocation.longitude, map);
    }
  }, []);

  const fetchRestaurants = async (latitude, longitude, map) => {
    try {
      const response = await fetch(
        `http://ec2-3-39-210-13.ap-northeast-2.compute.amazonaws.com:8080/map?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();

      // 가게 목록 데이터를 받아온 후, 각 가게의 위도와 경도 정보를 추가로 불러옵니다.
      const restaurantPromises = data.map(async (restaurant) => {
        const response = await axios.get(`http://ec2-3-39-210-13.ap-northeast-2.compute.amazonaws.com:8080/store/${restaurant.storeid}`);
        const storeData = response.data;
        return {
          ...restaurant,
          latitude: storeData.latitude,
          longitude: storeData.longitude,
        };
      });

      // 불러온 가게 정보를 설정합니다.
      const updatedRestaurants = await Promise.all(restaurantPromises);
      setRestaurantList(updatedRestaurants);

      // 주변 가게들의 마커에 사용할 뾰족한 마커 아이콘
      const storeMarkerIcon = {
        content: `
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
            <path d="M19.6317 19.3402L18.064 20.8676C16.9085 21.9848 15.4094 23.4212 13.5658 25.1771C12.4138 26.2744 10.5862 26.2743 9.43439 25.1768L4.82354 20.7583C4.24406 20.1978 3.75899 19.7251 3.36827 19.3402C-1.12276 14.9159 -1.12276 7.74259 3.36827 3.31825C7.85929 -1.10608 15.1407 -1.10608 19.6317 3.31825C24.1228 7.74259 24.1228 14.9159 19.6317 19.3402ZM14.8021 11.6867C14.8021 9.89002 13.3237 8.43357 11.5 8.43357C9.67635 8.43357 8.1979 9.89002 8.1979 11.6867C8.1979 13.4833 9.67635 14.9397 11.5 14.9397C13.3237 14.9397 14.8021 13.4833 14.8021 11.6867Z" fill="#FF6F3C"/>
          </svg>
        `,
        anchor: new naver.maps.Point(11.5, 26),
      };

      // 각 가게의 위도와 경도 정보를 사용하여 마커를 추가합니다.
      updatedRestaurants.forEach((restaurant) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
          map,
          icon: storeMarkerIcon,
        });

        // 마커 클릭 시 해당 가게 정보를 모달로 보여주는 기능 추가 (optional)
        naver.maps.Event.addListener(marker, "click", () => {
          handleMarkerClick(restaurant.storeid);
        });
      });
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <>
      <div ref={mapElement} className={styles.layout} />
      <MapList restaurantList={restaurantList} />
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
      
    </>
  );
}

export default Map;
