import React, { useEffect, useRef, useState } from "react";
import styles from "./Market.module.scss";
import { useUserData } from "../User/UserDataContext";

function MarketModal({ closeModal, mapInstance, market, isModalOpen }) {
  const mapElement = useRef(null);
  const mapInstanceRef = useRef(null); // Separate ref for the map instance
  const [heartOnOff, setHeartOnOff] = useState(false);
  const [wishCount, setWishCount] = useState(808);
  const [modalImage, setModalImage] = useState("");
  const [likeStores, setLikeStores] = useState([]);
  const { userData } = useUserData();

  // Function to toggle the heart icon state
  const heartOnOffHandler = () => {
    toggleHeart();
    const storeId = market.storeid;

    if (!heartOnOff) {
      setWishCount(wishCount +1)
      fetch("https://lovelyfub.com/likes", {
        method: "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          userid: userData.id,
          storeid: storeId, 
        })
      })
    } else if (heartOnOff) {
      setWishCount(wishCount -1)
      fetch(`https://lovelyfub.com/likes/${userData.id}/${storeId}`, {
        method: "DELETE", 
        body: JSON.stringify({
          user_id: userData.id,
          product_id: storeId,
        }),
      });
    }
  };

  const handleCloseModal = () => {
    closeModal();
  }

  const toggleHeart = () => {
    setHeartOnOff(!heartOnOff);
  };


  useEffect(() => {
    // Load the Naver Map API script dynamically
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=06ogqflpdw";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Naver Map API is loaded, initialize the map
      const { naver } = window;
      if (!naver || !mapElement.current) return;

      let location;
      if (market) {
        const { latitude, longitude } = market;
        location = new naver.maps.LatLng(latitude, longitude);
      } else {
        location = new naver.maps.LatLng(37.5656, 126.9769);
      }
    
      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: false,
      };
      mapInstanceRef.current = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
      });
    };
  }, [market]);

  useEffect(() => {
    // Check if the modal is closing
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    }
  }, []);


  useEffect(() => {
    // cafe 데이터가 유효한 경우에만 실행
    if (market) {
      const imageURL = `/푸드리퍼브 가게 프로필/${market.profile}`;
      // cafe 정보 업데이트
      setModalImage(imageURL);
    }
  }, [market]);

  useEffect(() => {
    // 사용자의 찜 목록 가져오기
    let accessToken ='';
      const cookies = document.cookie.split(';');
      for(let i =0; i< cookies.length; i++){
        if(cookies[i].includes('AccessToken')){
          accessToken = cookies[i].replace('AccessToken=', '');
        }
      }

    fetch("https://lovelyfub.com/mypage", { 
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.likeStores && data.likeStores.length > 0) {
          // 찜한 가게 목록 설정
          setLikeStores(likeStores);

          // 현재 가게가 찜 목록에 있는지 여부 확인
          const isLiked = data.likeStores.some((likedStore) => likedStore.storeid === market.storeid);
          setHeartOnOff(isLiked);
        } else {
          setLikeStores([]);
          setHeartOnOff(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching likeStores:", error);
        setLikeStores([]);
        setHeartOnOff(false);
      });
  }, [market, likeStores]);

  useEffect(() => {
    // cafe 데이터가 유효한 경우에만 실행
    if (market && mapInstanceRef.current) {
      // cafe의 위치 정보를 가져옵니다.
      const { latitude, longitude } = market;
      const cafeLocation = new window.naver.maps.LatLng(latitude, longitude);

      // 기존 마커를 삭제합니다.
      if (mapInstanceRef.current.markers && mapInstanceRef.current.markers.length > 0) {
        mapInstanceRef.current.markers.forEach((marker) => {
          marker.setMap(null);
        });
      }

      // 새로운 마커를 생성하여 지도에 표시합니다.
      const marker = new window.naver.maps.Marker({
        position: cafeLocation,
        map: mapInstanceRef.current,
      });

      // 새로운 마커를 markers 배열에 추가합니다.
      mapInstanceRef.current.markers = [marker];

      // 지도 중심을 마커 위치로 이동합니다.
      mapInstanceRef.current.setCenter(cafeLocation);
    }
  }, [market]);

  const handleMapClick = () => {
    if (market) {
      const { latitude, longitude } = market;
  
      // 새로운 탭을 열기 위한 URL 생성
      const naverMapURL = `https://map.naver.com/?mapMode=0&lat=${latitude}&lng=${longitude}&pinTitle=${encodeURIComponent(market.name)}`;
  
      // URL을 새 탭에서 열기
      window.open(naverMapURL, "_blank");
    } else {
      alert("카페 위치를 가져올 수 없습니다.");
    }
  };

    return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        {/* 상단 바 */}
        <span className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            <span onClick={heartOnOffHandler} className={styles.heart}>
                {heartOnOff ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12.8199 5.57912L11.9992 6.40163L11.1759 5.57838C9.07688 3.47931 5.67361 3.47931 3.57455 5.57838C1.47548 7.67744 1.47548 11.0807 3.57455 13.1798L11.4699 21.0751C11.7628 21.368 12.2377 21.368 12.5306 21.0751L20.432 13.1783C22.5264 11.0723 22.53 7.67857 20.4306 5.57912C18.3277 3.47623 14.9228 3.47623 12.8199 5.57912Z" fill="#FF6F3C"/>
                  </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M13.5686 5.57912L12.7479 6.40163L11.9246 5.57838C9.82561 3.47931 6.42234 3.47931 4.32328 5.57838C2.22421 7.67744 2.22421 11.0807 4.32328 13.1798L12.2186 21.0751C12.5115 21.368 12.9864 21.368 13.2793 21.0751L21.1807 13.1783C23.2751 11.0723 23.2787 7.67857 21.1793 5.57912C19.0764 3.47623 15.6715 3.47623 13.5686 5.57912ZM20.1171 12.1206L12.7489 19.4842L5.38394 12.1191C3.87065 10.6058 3.87065 8.15232 5.38394 6.63904C6.89722 5.12575 9.35073 5.12575 10.864 6.63904L12.2214 7.99648C12.5193 8.29435 13.004 8.28854 13.2946 7.98363L14.6293 6.63978C16.1464 5.12268 18.6015 5.12268 20.1186 6.63978C21.6323 8.15343 21.6297 10.5997 20.1171 12.1206Z" fill="#313131"/>
                  </svg>
                )}
            </span>

        {/*모달창 내용*/}
        <img src={modalImage} alt={market?.name} className={styles.modalImage} />
            
            <div className={styles.modalTitle}>{market?.name}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.subIcon}>
              <path d="M15.8033 14.6455L14.7809 15.6442C14.0273 16.3747 13.0496 17.3139 11.8472 18.4619C11.096 19.1794 9.90404 19.1793 9.15286 18.4618L6.14579 15.5728C5.76786 15.2063 5.45152 14.8972 5.1967 14.6455C2.26777 11.7527 2.26777 7.06246 5.1967 4.16963C8.12562 1.27679 12.8744 1.27679 15.8033 4.16963C18.7322 7.06246 18.7322 11.7527 15.8033 14.6455ZM12.6535 9.64128C12.6535 8.46655 11.6894 7.51426 10.5 7.51426C9.31066 7.51426 8.34646 8.46655 8.34646 9.64128C8.34646 10.816 9.31066 11.7683 10.5 11.7683C11.6894 11.7683 12.6535 10.816 12.6535 9.64128Z" fill="#D9D9D9"/>
            </svg>
            <div className={styles.location}>{market?.address}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.subIcon}>
              <path d="M7.02535 2.37314L7.94814 2.08073C8.81284 1.80673 9.73667 2.24954 10.107 3.11547L10.8439 4.83872C11.1651 5.58965 10.9869 6.47273 10.4034 7.02193L8.77968 8.55024C8.87986 9.46436 9.18973 10.3645 9.70924 11.2507C10.2288 12.1368 10.8777 12.8719 11.6559 13.456L13.6061 12.8111C14.3453 12.5666 15.1503 12.8475 15.6037 13.5082L16.66 15.0471C17.1871 15.815 17.0923 16.8744 16.4382 17.5255L15.7374 18.2233C15.0397 18.9178 14.0433 19.1698 13.1215 18.8847C10.9453 18.2115 8.9445 16.2129 7.11898 12.8891C5.2908 9.56033 4.64559 6.73611 5.18333 4.41646C5.40962 3.44038 6.11034 2.66308 7.02535 2.37314Z" fill="#D9D9D9"/>
            </svg>
            <div className={styles.location}>{market?.number}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.subIcon}>
              <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="#D9D9D9" stroke="#D9D9D9"/>
              <circle cx="12" cy="12" r="3.5" stroke="white"/>
              <circle cx="16" cy="8" r="1" fill="white"/>
            </svg>
            <div className={styles.instaLink}>
            <a href={market?.instagram}  target="_blank" rel="noopener noreferrer" >{market.instagram}</a></div>

        {/*모달창 지도*/}
        <div ref={mapElement} className={styles.mapLayout}  onClick={handleMapClick}/>
      </div>
      </div>
  );
}

export default MarketModal;
