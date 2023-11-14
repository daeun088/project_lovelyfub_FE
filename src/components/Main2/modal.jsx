import React, { useState } from 'react';
import styles from './modal.module.scss';

function CommentModal({ isOpen, onClose }) {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 댓글 전송 또는 상태 업데이트 로직을 추가하세요
    console.log('댓글 작성:', comment);
    // 추가로 필요한 로직 수행
    setComment(''); // 댓글 작성 후 텍스트 입력 상자 비우기
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19.7036L3.27302 11.2125C2.97614 10.9236 2.50131 10.9301 2.21246 11.227C1.9236 11.5239 1.93011 11.9987 2.22698 12.2875L11.477 21.2875C11.7681 21.5708 12.2319 21.5708 12.523 21.2875L21.773 12.2875C22.0699 11.9987 22.0764 11.5239 21.7875 11.227C21.4987 10.9301 21.0239 10.9236 20.727 11.2125L12 19.7036Z" fill="#737373" stroke="#737373"/>
          </svg>
        </button>
        <div className={styles.comment}>
          <img className={styles.profile} alt="Profile"/>
          <div className={styles.container}>
            <div className={styles.nickname}>닉네임</div>
            <div className={styles.ment}>깔끔한 인테리어에 단체석이 있는 식당이었어요.</div>
            <div className={styles.date}>2023.09.28</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.addComment}>
          <input
            placeholder="댓글 작성"
            value={comment}
            onChange={handleChange}
            rows="4"
            cols="50"
          ></input>
          {/*<button type="submit">댓글 작성</button>*/}
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
