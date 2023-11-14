import React, { useState } from "react";
import styles from "./RegionFilter.module.scss";

const CityListView = ({ cities }) => {
  return (
    <div>
      <ul >
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

const RegionView = ({ regions }) => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]?.name || "");

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div>
      <div>
        <div className={styles.header}>
          <div className={styles.firstColumn}>시・도</div>
          <div className={styles.secondColumn}>시・군・구</div>
        </div>
        
        <div className={styles.container}>
          <div> 
            {regions && regions.length > 0 ? (
              regions.map((region) => (
                <div key={region.name} onClick={() => handleSelectRegion(region.name)}  className={styles.regionColumn}>
                  {region.name}
                </div>
              ))
            ) : (
              <div>No regions available</div>
            )}
          </div>
          <div >
            {selectedRegion && (
              <CityListView cities={regions.find((r) => r.name === selectedRegion)?.cities || []} />
            )}
          </div>
        </div>
      </div>
      {selectedRegion && (
        <div>
          <p>선택된 시.도: {selectedRegion}</p>
        </div>
      )}
    </div>
  );
};

const RegionSelector = () => {
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
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "충남",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "충북",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "대구",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "부산",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "울산",
      cities: ["수원시", "성남시", "용인시"],
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

  return <RegionView regions={regions} />;
};

export default RegionSelector;
