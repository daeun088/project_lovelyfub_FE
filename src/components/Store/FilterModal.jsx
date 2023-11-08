import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterModal.module.scss";

function FilterModal({ isOpen, onClose, onFilterSelect }) {
  const [selectedFilter, setSelectedFilter] = useState("");
  let modalRef = useRef();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleApplyFilter = () => {
    onFilterSelect(selectedFilter);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.closeButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19.7036L3.27302 11.2125C2.97614 10.9236 2.50131 10.9301 2.21246 11.227C1.9236 11.5239 1.93011 11.9987 2.22698 12.2875L11.477 21.2875C11.7681 21.5708 12.2319 21.5708 12.523 21.2875L21.773 12.2875C22.0699 11.9987 22.0764 11.5239 21.7875 11.227C21.4987 10.9301 21.0239 10.9236 20.727 11.2125L12 19.7036Z" fill="#737373" stroke="#737373"/>
          </svg>
      </button>
      <div className={styles.modalContent}>
        <h2>지역 필터 설정</h2>
        <label>
          <input
            type="radio"
            value="filterOption1"
            checked={selectedFilter === "filterOption1"}
            onChange={() => handleFilterChange("filterOption1")}
          />
          필터 옵션 1
        </label>
        <label>
          <input
            type="radio"
            value="filterOption2"
            checked={selectedFilter === "filterOption2"}
            onChange={() => handleFilterChange("filterOption2")}
          />
          필터 옵션 2
        </label>
        {/* 추가 필터 옵션들을 여기에 추가할 수 있습니다. */}
        <button onClick={handleApplyFilter}>적용</button>
      </div>
    </div>
  );
}

export default FilterModal;
