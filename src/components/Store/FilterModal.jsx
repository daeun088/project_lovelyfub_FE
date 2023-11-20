import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterModal.module.scss";
import RegionView from "./Filter/RegionFilter";
import CategoryView from "./Filter/CategoryFilter";
import TypeView from "./Filter/TypeFilter";

function FilterModal({ isOpen, onClose, onFilterSelect }) {
  const [selectedFilter, setSelectedFilter] = useState("지역별");
  const [selectedCities, setSelectedCities] = useState([]);
  let modalRef = useRef();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleApplyFilter = () => {
    onFilterSelect(selectedFilter);
    onClose();
  };

  const handleSelectItem = (item) => {
    // 여기서 item이 도시일 경우 처리
    if (typeof item === 'string') {
      // 최대 3개까지 선택 가능
      if (selectedCities.length < 3 && !selectedCities.includes(item)) {
        setSelectedCities((prevCities) => [...prevCities, item]);
      }
    } else {
      // 다른 탭에서 선택된 경우에 대한 로직
    }
  };

  const renderView = () => {
    switch (selectedFilter) {
      case "지역별":
        return <RegionView onSelectItem={handleSelectItem}/>;
      case "카테고리별":
        return <CategoryView />;
      case "유형별":
        return <TypeView />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.closeButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19.7036L3.27302 11.2125C2.97614 10.9236 2.50131 10.9301 2.21246 11.227C1.9236 11.5239 1.93011 11.9987 2.22698 12.2875L11.477 21.2875C11.7681 21.5708 12.2319 21.5708 12.523 21.2875L21.773 12.2875C22.0699 11.9987 22.0764 11.5239 21.7875 11.227C21.4987 10.9301 21.0239 10.9236 20.727 11.2125L12 19.7036Z" fill="#737373" stroke="#737373"/>
          </svg>
        </button>
      <ul className={styles.typeBar}>
        <li className={selectedFilter === "지역별" ? styles.active : ""} onClick={() => handleFilterChange("지역별")}>지역별</li>
        <li className={selectedFilter === "카테고리별" ? styles.active : ""} onClick={() => handleFilterChange("카테고리별")}>카테고리별</li>
        <li className={selectedFilter === "유형별" ? styles.active : ""} onClick={() => handleFilterChange("유형별")}>유형별</li>
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
