import React, { useState } from "react";
import styles from "./RegionFilter.module.scss";

const CityListView = ({ cities, selectedCities, onSelectCity }) => {
  return (
    <div className={styles.cityList}>
      <ul>
        {cities.map((city) => (
          <li
            key={city}
            onClick={() => onSelectCity(city)} // onSelectCity 함수 호출
            className={selectedCities.includes(city) ? styles.active : ""}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RegionView = ({ regions, onSelectCity }) => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]?.name || "");
  const [selectedCities, setSelectedCities] = useState([]);

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  const handleSelectCity = (city) => {
    // 최대 3개까지 선택 가능
    if (selectedCities.length < 3) {
      setSelectedCities((prevCities) => [...prevCities, city]);
      onSelectCity(city);
    }
  };

  const handleDeselectCity = (city) => {
    setSelectedCities((prevCities) => prevCities.filter((selectedCity) => selectedCity !== city));
  };

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.firstColumn}>시・도</div>
          <div className={styles.secondColumn}>시・군・구</div>
        </div>
        
        <div className={styles.container}>
          <div> 
            {regions && regions.length > 0 ? (
              regions.map((region) => (
                <div key={region.name} onClick={() => handleSelectRegion(region.name)}
                className={`${styles.regionColumn} ${
                  selectedRegion === region.name ? styles.selectedRegion : ""
                }`}>
                  {region.name}
                </div>
              ))
            ) : (
              <div>No regions available</div>
            )}
          </div>
          <div>
            {selectedRegion && (
              <CityListView
                cities={regions.find((r) => r.name === selectedRegion)?.cities || []}
                selectedCities={selectedCities}
                onSelectCity={handleSelectCity}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.choiceBlock}>
          <div className={styles.maxText}>*최대 3개까지 선택가능해요</div>
          <div className={styles.filterList}>
          {selectedCities.map(city => (
              <li key={city}>
                {city}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"  onClick={() => handleDeselectCity(city)}>
                  <g clip-path="url(#clip0_419_979)">
                    <path d="M4.17293 4.17387C4.37429 3.97251 4.69032 3.95559 4.91082 4.12337L4.96845 4.17369L8.81406 8.01802L12.6606 4.17149C12.8803 3.95182 13.2364 3.95182 13.4561 4.17149C13.6575 4.37285 13.6742 4.68893 13.5065 4.90939L13.4561 4.96698L9.60955 8.81352L13.455 12.6569C13.6747 12.8765 13.6749 13.2327 13.4552 13.4524C13.2539 13.6537 12.9379 13.6707 12.7173 13.5029L12.6597 13.4525L8.81406 9.60901L4.9697 13.4534C4.75002 13.6731 4.39386 13.673 4.1742 13.4534C3.97284 13.252 3.95605 12.936 4.12384 12.7155L4.1742 12.6579L8.01856 8.81352L4.17311 4.96934C3.95339 4.74973 3.95327 4.39354 4.17293 4.17387Z" fill="#737373"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_419_979">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </li>
            ))}
        </div>
      </div>
    </div>
  );
};

const RegionSelector = () => {

  const handleSelectCity = (city) => {
    // 여기에서 도시를 처리하는 로직을 추가
    console.log(`Selected city: ${city}`);
  };

  // 가상의 지역 정보
  const regions = [
    {
      name: "서울",
      cities: ["강남구", "강동구","강북구","강서구","관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구", "용산구","은평구","종로구","중구","중랑구",],
    },
    {
      name: "인천",
      cities: ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "강화군", "중구"],
    },
    {
      name: "경기",
      cities: ["수원시", "성남시", "용인시", "안양시", "안산시", "과천시", "광명시", "광주시", "군포시", "부천시", "시흥시", "김포시", "안성시", "오산시", "의왕시", "이천시", "평택시", "하남시", "화성시", "여주시", "양평군", "고양시", "구리시", "남양주시", "동두천시", "양주시", "의정부시", "파주시", "포천시", "연천군", "가평군"],
    },
    {
      name: "대전",
      cities: ["대덕구", "동구", "서구", "유성구", "중구"],
    },
    {
      name: "세종",
      cities: ["조치원읍", "연기면", "연동면", "부강면", "금남면", "장군면", "연서면", "전의면", "전동면", "소정면"],
    },
    {
      name: "충남",
      cities: ["천안시", "공주시", "보령시", "아산시", "서산시", "계룡시", "당진시", "금산시", "부여시", "서천시", "청양군", "홍성군", "예산군", "태안군"],
    },
    {
      name: "충북",
      cities: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
    },
    {
      name: "대구",
      cities: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"],
    },
    {
      name: "부산",
      cities: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
    },
    {
      name: "울산",
      cities: ["중구", "남구", "동구", "북구", "울주군"],
    },
    {
      name: "경북",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "경남",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "전북",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "전남",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "광주",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "강원",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "제주",
      cities: ["제주시", "서귀포시",],
    },

  ];

  return <RegionView regions={regions} onSelectCity={handleSelectCity} />;
};

export default RegionSelector;
