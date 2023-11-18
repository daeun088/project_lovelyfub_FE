import React, {useState}from "react";
import styles from './Setting.module.scss';
import { useNavigate } from "react-router-dom";

function ProfileSetting(){
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState("");
    const [snsId, setSnsId] = useState("");

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        // 이미지를 상태에 업데이트
        setImage(URL.createObjectURL(selectedImage));
    };

    function handleClick() {
        navigate('/user/mypage');
    }

    return (
        <div className={styles.layout}>
            <div className={styles.pictureContainer}>
            <img className={styles.picture} src={image} alt="Profile" />
                <div className={styles.picSetting}>
                    {/* input 태그를 통해 파일 업로드 기능 추가 */}
                    <label htmlFor="imageUpload">사진 수정</label>
                    <input
                        type="file"
                        style={{display :"none"}}
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className={styles.userInfo}>
                <div className = {styles.infoBlock}>
                    <div className={styles.nickname}>닉네임</div>
                    <input className={styles.inputBlock} placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className = {styles.infoBlock}>
                    <div className={styles.nickname}>SNS ID</div>
                    <input className={styles.inputBlock} placeholder="SNS ID"
                    value={snsId}
                    onChange={(e) => setSnsId(e.target.value)}/>
                </div>
            </div>
            <div className={styles.button} onClick={handleClick}>수정완료</div>
        </div>
    )
}

export default ProfileSetting;