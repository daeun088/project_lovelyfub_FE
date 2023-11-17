import React, { useState, useRef } from "react";
import styles from "./Content.module.scss";

function Content() {
  const [image, setImage] = useState(null);
  const [contentText, setContentText] = useState("");
  const fileInput = useRef(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  return (
    <div className={styles.layout}>
        <div className={styles.pictureLayout}>
        <div onClick={handleButtonClick} className={styles.picture}>
        {image && <img src={image} alt="Preview" />}
        </div>
        <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInput}
            onChange={handleImageChange}
        />
        </div>
      
      <div className={styles.contentLayout}>
        <div className={styles.storeTag}>가게를 태그해주세요.</div>
        <div className={styles.rateScore}>별점을 선택해주세요.</div>
      </div>
      
      <div className={styles.contentText}>
        <textarea
          value={contentText}
          placeholder="내용을 입력해주세요"
          onChange={(e) => setContentText(e.target.value)}
        />
      </div>
      <div className={styles.uploadButton}>리뷰업로드</div>
    </div>
  );
}

export default Content;
