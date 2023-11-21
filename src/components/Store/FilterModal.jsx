import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterModal.module.scss";
import RegionView from "./Filter/RegionFilter";
import CategoryView from "./Filter/CategoryFilter";
import TypeView from "./Filter/TypeFilter";
// FilterModal.jsx

function FilterModal({ isOpen, onClose, onFilterSelect }) {
  const [selectedFilter, setSelectedFilter] = useState("detaillocation");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const modalRef = useRef();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleCategoryFilterUpdate = (filter) => {
    setCategoryFilter(filter);
  };

  const handleApplyFilter = () => {
    const url = `/store/filter?page=1&size=5&${selectedFilter.toLowerCase()}=${selectedCities.join('&')}`;
    onFilterSelect(url);
    onClose();
  };

  const renderView = () => {
    switch (selectedFilter) {
      case "detaillocation":
        return <RegionView />;
      case "category":
        // CategoryView에 onFilterSelect 함수를 전달
        return <CategoryView onFilterSelect={handleCategoryFilterUpdate} />;
      case "usertype":
        return <TypeView />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.closeButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 19.7036L3.27302 11.2125C2.97614 10.9236 2.50131 10.9301 2.21246 11.227C1.9236 11.5239 1.93011 11.9987 2.22698 12.2875L11.477 21.2875C11.7681 21.5708 12.2319 21.5708 12.523 21.2875L21.773 12.2875C22.0699 11.9987 22.0764 11.5239 21.7875 11.227C21.4987 10.9301 21.0239 10.9236 20.727 11.2125L12 19.7036Z" fill="#737373" stroke="#737373" />
        </svg>
      </button>
      <ul className={styles.typeBar}>
        <li className={selectedFilter === "detaillocation" ? styles.active : ""} onClick={() => handleFilterChange("detaillocation")}>지역별</li>
        <li className={selectedFilter === "category" ? styles.active : ""} onClick={() => handleFilterChange("category")}>카테고리별</li>
        <li className={selectedFilter === "usertype" ? styles.active : ""} onClick={() => handleFilterChange("usertype")}>유형별</li>
      </ul>
      <div className={styles.modalContent}>
        {renderView()}
        <div className={styles.choiceBlock}>
          <div onClick={handleApplyFilter} className={styles.choiceButton}>확인</div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
