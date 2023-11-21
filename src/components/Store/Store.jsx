import React, { useState, useEffect, useRef } from "react";
import styles from "./Store.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";

const Store = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  //const [selectedStore, setSelectedStore] = useState(null);
  const [page, setPage] = useState(1);

  const mapElement = useRef(null);
  const mapInstance = useRef(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // 추가: 필터 모달의 상태

  const onOffFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  // 필터 적용
  const applyFilter = (url) => {

    axios
    .get(`https://lovelyfub.com${url}`)
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

        // 선택한 필터에 따라 필터된 데이터로 업데이트
        setData(storeData);
        setPage((prevPage) => prevPage + 1); // 다음 페이지 번호 설정
      })
      .catch((error) => console.error("Error fetching filtered data:", error));
  };

  const loadMoreData = () => {
    axios
      .get(`https://lovelyfub.com/store?page=${page}&size=30`)
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
        setData((prevData) => [...prevData, ...storeData]);
        setPage((prevPage) => prevPage + 1); // 다음 페이지 번호 설정
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        loadMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreData]);

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
  }, [isFilterModalOpen]);

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
    navigate(`/store/${storeId}`);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.filterBar} onClick={onOffFilterModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M11.2188 13.1667C11.5553 13.1667 11.8281 13.4325 11.8281 13.7604C11.8281 14.0883 11.5553 14.3542 11.2188 14.3542H8.78125C8.44471 14.3542 8.17188 14.0883 8.17188 13.7604C8.17188 13.4325 8.44471 13.1667 8.78125 13.1667H11.2188ZM13.6562 9.20833C13.9928 9.20833 14.2656 9.47418 14.2656 9.80208C14.2656 10.13 13.9928 10.3958 13.6562 10.3958H6.34375C6.0072 10.3958 5.73438 10.13 5.73438 9.80208C5.73438 9.47418 6.0072 9.20833 6.34375 9.20833H13.6562ZM16.0938 5.25C16.4303 5.25 16.7031 5.51583 16.7031 5.84375C16.7031 6.17167 16.4303 6.4375 16.0938 6.4375H3.90625C3.5697 6.4375 3.29688 6.17167 3.29688 5.84375C3.29688 5.51583 3.5697 5.25 3.90625 5.25H16.0938Z" fill="#313131"/>
        </svg>
        필터설정
      </div>
      {isFilterModalOpen&&(
        <div
          style={{
            display: "flex",
            position: "fixed",
            right: "0", left: "0",                  
            bottom: "0",
            top : "0",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: "100",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
        <FilterModal isOpen={setIsFilterModalOpen} onClose={onOffFilterModal} onFilterSelect={applyFilter} />
        </div>
      )}

      <div className={styles.cafeContainer}>
      {data.map((store) => (
        <div key={store.id} className={styles.cafeList} onClick={() => handleItemClick(store.id)}>
          {/*<img src={`/푸드리퍼브 가게 프로필/${store.profile}`}
            alt="store" className={styles.productImage}/>*/}
            <div className={styles.productImage}>
              <img src={`/subImage.png`} alt="store"/>
            </div>
          <div className={styles.productTitle}>{store.name}</div>
          <div className={styles.productText}>{store.description}</div>
          <div className={styles.productUsertype}>{store.usertype}</div>
          </div>
      ))}
      </div>

      
    </div>

    
  );
}

export default Store;
