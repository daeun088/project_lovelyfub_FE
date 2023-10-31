import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StoreDetail() {
    const {storeId} = useParams();
    const [store, setStore] = useState(null);


    // 가게 정보를 서버에서 가져오는 요청
    axios.get(`https://lovelyfub.com/store/${storeId}`)
      .then((response) => {
        setStore(response.data);
      })
      .catch((error) => console.error("Error fetching store data:", error));

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{store.name}</h1>
      <p>{store.description}</p>
      {/* 상세 정보를 표시할 나머지 컴포넌트를 추가하세요 */}
    </div>
  );
}

export default StoreDetail;