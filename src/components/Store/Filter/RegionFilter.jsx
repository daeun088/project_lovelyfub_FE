import React, { useState } from "react";
import styles from "./RegionFilter.module.scss";

const CityListView = ({ cities }) => {
  return (
    <div className={styles.cityList}>
      <ul>
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
      <div className={styles.regionTable}>
        <ul className={styles.header}>
          <li>시・도</li>
          <li>시・군・구</li>
        </ul>
        <div className={styles.firstColumn}>
          {regions && regions.length > 0 ? (
            regions.map((region) => (
              <div key={region.name} onClick={() => handleSelectRegion(region.name)}>
                {region.name}
              </div>
            ))
          ) : (
            <div>No regions available</div>
          )}
        </div>
        <div className={styles.secondColumn}>
          {selectedRegion && (
            <CityListView cities={regions.find((r) => r.name === selectedRegion)?.cities || []} />
          )}
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
      cities: ["강남구", "강동구", "강동구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구"],
    },
    {
      name: "인천",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "경기",
      cities: ["수원시", "성남시", "용인시"],
    },
    {
      name: "대전",
      cities: ["수원시", "성남시", "용인시"],
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

  ];

  return <RegionView regions={regions} />;
};

export default RegionSelector;
