import React, { useState } from "react";
import styles from "./CategoryFilter.module.scss"

const CategoryView = () => {

    const [selectedFilter, setSelectedFilter] = useState("전체보기");

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

  return (
    <div>
        <ul className={styles.typeBar}>
            <li className={selectedFilter === "전체보기" ? styles.active : ""} onClick={() => handleFilterChange("전체보기")}>전체보기</li>
            <li className={selectedFilter === "식당" ? styles.active : ""} onClick={() => handleFilterChange("식당")}>식당</li>
            <li className={selectedFilter === "마켓" ? styles.active : ""} onClick={() => handleFilterChange("마켓")}>마켓</li>
            <li className={selectedFilter === "카페&베이커리" ? styles.active : ""} onClick={() => handleFilterChange("카페&베이커리")}>카페&베이커리</li>
      </ul>
    </div>
  );
};

export default CategoryView;