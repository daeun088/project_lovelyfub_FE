// CategoryView.jsx

import React, { useState } from "react";
import styles from "./CategoryFilter.module.scss";

const CategoryView = ({ onFilterSelect }) => {
  const [selectedFilter, setSelectedFilter] = useState("전체보기");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters((prevFilters) => prevFilters.filter((selectedFilter) => selectedFilter !== filter));
  };

  const handleApplyFilter = () => {
    // 선택된 필터를 onFilterSelect 함수를 통해 전달
    onFilterSelect(`category=${selectedFilter.toLowerCase()}`);
  };

  const filters = ["전체보기", "식당", "마켓", "카페&베이커리"];

  return (
    <div>
      <ul className={styles.typeBar}>
        {filters.map((filter) => (
          <li key={filter} className={selectedFilter === filter ? styles.active : ""} onClick={() => handleFilterChange(filter)}>
            {filter}
          </li>
        ))}
      </ul>
      <div className={styles.filterList}>
        {selectedFilters.map((filter) => (
          <li key={filter}>
            {filter}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" onClick={() => handleRemoveFilter(filter)} style={{ cursor: "pointer" }}>
              <g clip-path="url(#clip0_419_979)">
                <path d="M4.17293 4.17387C4.37429 3.97251 4.69032 3.95559 4.91082 4.12337L4.96845 4.17369L8.81406 8.01802L12.6606 4.17149C12.8803 3.95182 13.2364 3.95182 13.4561 4.17149C13.6575 4.37285 13.6742 4.68893 13.5065 4.90939L13.4561 4.96698L9.60955 8.81352L13.455 12.6569C13.6747 12.8765 13.6749 13.2327 13.4552 13.4524C13.2539 13.6537 12.9379 13.6707 12.7173 13.5029L12.6597 13.4525L8.81406 9.60901L4.9697 13.4534C4.75002 13.6731 4.39386 13.673 4.1742 13.4534C3.97284 13.252 3.95605 12.936 4.12384 12.7155L4.1742 12.6579L8.01856 8.81352L4.17311 4.96934C3.95339 4.74973 3.95327 4.39354 4.17293 4.17387Z" fill="#737373" />
              </g>
              <defs>
                <clipPath id="clip0_419_979">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </li>
        ))}
        
      </div>
      <div onClick={handleApplyFilter} className={styles.choiceButton}>확인</div>
      
    </div>
  );
};

export default CategoryView;
