import React, { useState, useRef } from "react";
import styles from "./Content.module.scss";

function Content() {
  const [image, setImage] = useState(null);
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
  );
}

export default Content;
