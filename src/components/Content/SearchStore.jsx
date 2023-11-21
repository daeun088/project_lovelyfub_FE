import React, { useState } from "react";
import styles from "./SearchStore.module.scss";
import { useNavigate } from "react-router-dom";

function SearchStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 가게의 인덱스를 저장하는 상태
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStoreClick = (index) => {
    setSelectedStore(index);
  };

  const handleSearchClick = async () => {
    try {
      // 검색어를 서버로 전송
      const response = await fetch(`https://lovelyfub.com/store/search?keyword=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);

      // 서버에서 받아온 데이터 출력
      console.log("검색 결과:", data);
    } catch (error) {
      console.error("검색 에러:", error);
    }
  };

  const handleContentClick = (index) => {
    const selectedStoreData = searchResults[index];
    navigate(`/content?storeid=${selectedStoreData.storeid}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.searchInput}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 11.7319 16.6427 13.3219 15.6295 14.5688L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2641 20.7966 19.8474 20.8208 19.5538 20.6029L19.4697 20.5303L14.5688 15.6295C13.3219 16.6427 11.7319 17.25 10 17.25C5.99594 17.25 2.75 14.0041 2.75 10C2.75 5.99594 5.99594 2.75 10 2.75ZM10 4.25C6.82436 4.25 4.25 6.82436 4.25 10C4.25 13.1756 6.82436 15.75 10 15.75C13.1756 15.75 15.75 13.1756 15.75 10C15.75 6.82436 13.1756 4.25 10 4.25Z" fill="#D9D9D9" />
        </svg>
        <input
          type="text"
          id="searchInput"
          placeholder="가게검색"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className={styles.storeListContainer}>
        {searchResults.map((result, index) => (
          <div
            key={result.storeid}
            className={`${styles.storeBlock} ${selectedStore === index ? styles.selected : ""}`}
            onClick={() => handleStoreClick(index)}
          >
            <div className={styles.storeName} onClick={() =>handleContentClick(index)} >
              {result.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchStore;
