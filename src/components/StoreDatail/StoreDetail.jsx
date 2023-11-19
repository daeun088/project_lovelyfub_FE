import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./StoreDetail.module.scss";

function StoreDetail() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const mapElement = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // useEffect 내에서 비동기 함수 호출
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://lovelyfub.com/store/${storeId}`);
        setStore(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    // 비동기 함수 호출
    fetchData();
  }, [storeId]); // storeId가 변경될 때마다 useEffect가 실행되도록

  useEffect(() => {
    // Load the Naver Map API script dynamically
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=06ogqflpdw";
    script.async = true;
  
    script.addEventListener("load", () => {
      // Naver Map API is loaded, initialize the map
      const { naver } = window;
      if (!naver || !mapElement.current) return;
  
      let location;
      if (store) {
        const { latitude, longitude } = store;
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
    });
  
    document.head.appendChild(script);
  }, [store]);

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
    // store 데이터가 유효한 경우에만 실행
    if (store && mapInstanceRef.current) {
      // store의 위치 정보를 가져옵니다.
      const { latitude, longitude } = store;
      const storeLocation = new window.naver.maps.LatLng(latitude, longitude);

      // 기존 마커를 삭제합니다.
      if (mapInstanceRef.current.markers && mapInstanceRef.current.markers.length > 0) {
        mapInstanceRef.current.markers.forEach((marker) => {
          marker.setMap(null);
        });
      }

      // 새로운 마커를 생성하여 지도에 표시합니다.
      const marker = new window.naver.maps.Marker({
        position: storeLocation,
        map: mapInstanceRef.current,
      });

      // 새로운 마커를 markers 배열에 추가합니다.
      mapInstanceRef.current.markers = [marker];

      // 지도 중심을 마커 위치로 이동합니다.
      mapInstanceRef.current.setCenter(storeLocation);
    }
  }, [store]);

  const handleMapClick = () => {
    if (store) {
      const { latitude, longitude } = store;
  
      // 새로운 탭을 열기 위한 URL 생성
      const naverMapURL = `https://map.naver.com/?mapMode=0&lat=${latitude}&lng=${longitude}&pinTitle=${encodeURIComponent(store.name)}`;
  
      // URL을 새 탭에서 열기
      window.open(naverMapURL, "_blank");
    } else {
      alert("카페 위치를 가져올 수 없습니다.");
    }
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.pictureLayout}>
        <div className={styles.productImage}>
          <img src={`/subImage.png`} alt="store" />
        </div>
      </div>

      <div className={styles.storeLayout}>
        <div className={styles.storeTitleContainer}>
          <div className={styles.storeName}>{store.name}</div>
          <div className={styles.titleIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17.0002 3.00195C18.656 3.00195 19.9983 4.34424 19.9983 6.00003C19.9983 7.65582 18.656 8.9981 17.0002 8.9981C16.158 8.9981 15.3969 8.65085 14.8523 8.09171L9.39523 11.2113C9.46358 11.4626 9.50005 11.7271 9.50005 12C9.50005 12.273 9.46358 12.5374 9.39523 12.7887L14.8531 15.9076C15.3976 15.3489 16.1584 15.002 17.0002 15.002C18.656 15.002 19.9983 16.3442 19.9983 18C19.9983 19.6558 18.656 20.9981 17.0002 20.9981C15.3444 20.9981 14.0021 19.6558 14.0021 18C14.0021 17.7271 14.0386 17.4626 14.107 17.2113L8.64985 14.0917C8.10525 14.6508 7.34417 14.9981 6.50198 14.9981C4.84619 14.9981 3.50391 13.6558 3.50391 12C3.50391 10.3442 4.84619 9.00195 6.50198 9.00195C7.34379 9.00195 8.10457 9.3489 8.64912 9.9076L14.107 6.78874C14.0386 6.53743 14.0021 6.27299 14.0021 6.00003C14.0021 4.34424 15.3444 3.00195 17.0002 3.00195Z" fill="#313131"/>
            </svg>
          </div>
          <div className={styles.titleIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6.19094 21.8547C5.6948 22.2117 5.00293 21.8571 5.00293 21.2459V6.25C5.00293 4.45507 6.458 3 8.25293 3H15.7513C17.5462 3 19.0013 4.45507 19.0013 6.25V21.2459C19.0013 21.8571 18.3094 22.2117 17.8133 21.8547L12.0021 17.6738L6.19094 21.8547ZM17.5013 6.25C17.5013 5.2835 16.7178 4.5 15.7513 4.5H8.25293C7.28643 4.5 6.50293 5.2835 6.50293 6.25V19.7824L11.5641 16.141C11.8258 15.9528 12.1785 15.9528 12.4401 16.141L17.5013 19.7824V6.25Z" fill="#313131"/>
            </svg>
          </div>
        </div>
        
        <div className={styles.storeInfoContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.subIcon}>
            <path d="M15.8033 14.6455L14.7809 15.6442C14.0273 16.3747 13.0496 17.3139 11.8472 18.4619C11.096 19.1794 9.90404 19.1793 9.15286 18.4618L6.14579 15.5728C5.76786 15.2063 5.45152 14.8972 5.1967 14.6455C2.26777 11.7527 2.26777 7.06246 5.1967 4.16963C8.12562 1.27679 12.8744 1.27679 15.8033 4.16963C18.7322 7.06246 18.7322 11.7527 15.8033 14.6455ZM12.6535 9.64128C12.6535 8.46655 11.6894 7.51426 10.5 7.51426C9.31066 7.51426 8.34646 8.46655 8.34646 9.64128C8.34646 10.816 9.31066 11.7683 10.5 11.7683C11.6894 11.7683 12.6535 10.816 12.6535 9.64128Z" fill="#D9D9D9"/>
            </svg>
            <div className={styles.location}>{store.address}</div>
      </div>
      <div className={styles.storeInfoContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.subIcon}>
              <path d="M7.02535 2.37314L7.94814 2.08073C8.81284 1.80673 9.73667 2.24954 10.107 3.11547L10.8439 4.83872C11.1651 5.58965 10.9869 6.47273 10.4034 7.02193L8.77968 8.55024C8.87986 9.46436 9.18973 10.3645 9.70924 11.2507C10.2288 12.1368 10.8777 12.8719 11.6559 13.456L13.6061 12.8111C14.3453 12.5666 15.1503 12.8475 15.6037 13.5082L16.66 15.0471C17.1871 15.815 17.0923 16.8744 16.4382 17.5255L15.7374 18.2233C15.0397 18.9178 14.0433 19.1698 13.1215 18.8847C10.9453 18.2115 8.9445 16.2129 7.11898 12.8891C5.2908 9.56033 4.64559 6.73611 5.18333 4.41646C5.40962 3.44038 6.11034 2.66308 7.02535 2.37314Z" fill="#D9D9D9"/>
            </svg>
            <div className={styles.location}>{store.number}</div>
      </div>

      <div className={styles.storeInfoContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.subIcon}>
              <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="#D9D9D9" stroke="#D9D9D9"/>
              <circle cx="12" cy="12" r="3.5" stroke="white"/>
              <circle cx="16" cy="8" r="1" fill="white"/>
            </svg>
            <div className={styles.instaLink}>
            <a href={store.instagram}  target="_blank" rel="noopener noreferrer" >{store.instagram}</a></div>
      </div> 
      <div ref={mapElement} className={styles.mapLayout}  onClick={handleMapClick}/>
      <div className={styles.reviewButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.9519 3.04712C19.5543 1.6496 17.2885 1.64967 15.8911 3.04727L3.94103 14.9987C3.5347 15.4051 3.2491 15.9162 3.116 16.4753L2.02041 21.0767C1.96009 21.3301 2.03552 21.5966 2.21968 21.7808C2.40385 21.9649 2.67037 22.0404 2.92373 21.98L7.52498 20.8845C8.08418 20.7514 8.59546 20.4656 9.00191 20.0591L18.9995 10.0604C19.6777 10.7442 19.676 11.8484 18.9943 12.5301L17.2109 14.3135C16.918 14.6064 16.918 15.0812 17.2109 15.3741C17.5038 15.667 17.9786 15.667 18.2715 15.3741L20.055 13.5907C21.3224 12.3233 21.3242 10.2693 20.0601 8.99967L20.952 8.10763C22.3493 6.71015 22.3493 4.44453 20.9519 3.04712ZM16.9518 4.10787C17.7634 3.29611 19.0795 3.29607 19.8912 4.10778C20.7028 4.91942 20.7029 6.23534 19.8913 7.04704L7.94119 18.9985C7.73104 19.2087 7.46668 19.3564 7.17755 19.4253L3.76191 20.2385L4.57521 16.8227C4.64402 16.5337 4.79168 16.2694 5.00175 16.0593L16.9518 4.10787Z" fill="#313131"/>
        </svg>
        이 가게 리뷰하기
      </div>
        <div className={styles.line}/>
      </div>

      <div className={styles.storeLayout}>
        <div className={styles.reviewTitle}>
          리뷰(43)
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M7.68549 1.03559C7.97889 0.102009 9.30009 0.10201 9.59348 1.03559L10.8082 4.90063C10.9391 5.31732 11.3254 5.60081 11.7621 5.60081H15.7619C16.7226 5.60081 17.1306 6.82341 16.3625 7.40037L13.0699 9.87365C12.7311 10.1282 12.5895 10.5687 12.7165 10.973L13.9606 14.9315C14.252 15.8587 13.1831 16.6146 12.406 16.0309L9.24008 13.6528C8.88428 13.3855 8.39469 13.3855 8.03889 13.6528L4.87301 16.0309C4.09591 16.6146 3.02702 15.8587 3.31841 14.9315L4.56245 10.973C4.68951 10.5687 4.54791 10.1282 4.20904 9.87365L0.916432 7.40037C0.148351 6.82342 0.556388 5.60081 1.51702 5.60081H5.51682C5.95361 5.60081 6.33986 5.31732 6.47082 4.90063L7.68549 1.03559Z" fill="#FFC93C"/>
          </svg>
        </div>

        <div className={styles.gridContainer}>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
          <img src={`/subImage.png`} alt="store" className={styles.gridItem}/>
        </div>

        <div className={styles.reviewBlock}>
          <div className={styles.reviewScore}><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
  <path d="M3.54894 0.927052C3.8483 0.00574112 5.1517 0.00573993 5.45106 0.927051L5.73483 1.80041C5.8687 2.21243 6.25266 2.49139 6.68588 2.49139H7.60419C8.57291 2.49139 8.97568 3.73101 8.19197 4.30041L7.44905 4.84017C7.09856 5.09481 6.9519 5.54618 7.08578 5.9582L7.36955 6.83156C7.6689 7.75287 6.61442 8.519 5.83071 7.94959L5.08779 7.40983C4.7373 7.15519 4.2627 7.15519 3.91221 7.40983L3.16929 7.94959C2.38558 8.51899 1.3311 7.75287 1.63045 6.83156L1.91422 5.9582C2.0481 5.54618 1.90144 5.09481 1.55095 4.84017L0.808031 4.30041C0.0243175 3.73101 0.427093 2.49139 1.39582 2.49139H2.31412C2.74734 2.49139 3.1313 2.21243 3.26517 1.80041L3.54894 0.927052Z" fill="#FFC93C"/>
</svg>
        sjk****
        <div className={styles.reviewDate}>2023.09.16</div>
          </div>
         <div className={styles.reviewText}>깔끔한 인테리어에 단체석과 1인석이 있는 식당이었어용ㅋ</div> 
         <div className={styles.reviewMore}>더보기</div>
         <img src={`/subImage.png`} alt="store" className={styles.reviewImage}/>
        </div>

        <div className={styles.reviewBlock}>
          <div className={styles.reviewScore}><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
  <path d="M3.54894 0.927052C3.8483 0.00574112 5.1517 0.00573993 5.45106 0.927051L5.73483 1.80041C5.8687 2.21243 6.25266 2.49139 6.68588 2.49139H7.60419C8.57291 2.49139 8.97568 3.73101 8.19197 4.30041L7.44905 4.84017C7.09856 5.09481 6.9519 5.54618 7.08578 5.9582L7.36955 6.83156C7.6689 7.75287 6.61442 8.519 5.83071 7.94959L5.08779 7.40983C4.7373 7.15519 4.2627 7.15519 3.91221 7.40983L3.16929 7.94959C2.38558 8.51899 1.3311 7.75287 1.63045 6.83156L1.91422 5.9582C2.0481 5.54618 1.90144 5.09481 1.55095 4.84017L0.808031 4.30041C0.0243175 3.73101 0.427093 2.49139 1.39582 2.49139H2.31412C2.74734 2.49139 3.1313 2.21243 3.26517 1.80041L3.54894 0.927052Z" fill="#FFC93C"/>
</svg>
        sjk****
        <div className={styles.reviewDate}>2023.09.16</div>
          </div>
         <div className={styles.reviewText}>깔끔한 인테리어에 단체석과 1인석이 있는 식당이었어용ㅋ</div> 
         <div className={styles.reviewMore}>더보기</div>
         <img src={`/subImage.png`} alt="store" className={styles.reviewImage}/>
        </div>

        <div className={styles.moreButton}>+더보기</div>
      </div>

      </div>
  );
}

export default StoreDetail;
