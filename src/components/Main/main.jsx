import React from 'react';
import styles from './main.module.scss';
import mainpic from './image/main_image1.png'; // 이미지를 import 합니다.
import subImage from './image/sub_image1.jpg';


function Main() {
  return (
    <div>
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <div className={styles.titleText}>
                    건강한 지구를 위한
                    <span className={styles.mainHighlight}>러블리퍼브</span>
                    <span className={styles.subtext}>러블리퍼브는 유통과정에서 버려지는<br /> 음식물쓰레기를 줄이고 탄소배출과 수질오염을 <br/>방지하는 푸드리퍼브의 가치에 집중해요.</span>
                    <br/><br/><br/><br/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 19.2892L20.727 11.2024C21.0239 10.9272 21.4987 10.9334 21.7875 11.2162C22.0764 11.4989 22.0699 11.9511 21.773 12.2262L12.523 20.7976C12.2319 21.0675 11.7681 21.0675 11.477 20.7976L2.227 12.2262C1.93009 11.9511 1.9236 11.4989 2.2125 11.2162C2.5013 10.9334 2.9761 10.9272 3.273 11.2024L12 19.2892Z" fill="white"/>
                    </svg>
                    </div>
                </div>
            <img src={mainpic} alt="Main" className={styles.backgroundImage} />
        </div>
        {/*푸드리퍼브 설명*/}
        <div className={styles.middleTitle}>
            <p><span className={styles.underline}
            >푸드리퍼브</span>가 뭐예요?</p>
            <div className={styles.middleTitle2}>음식(Food)과 제품공급(Refurbished)의 합성어예요.<br/><br/>
                <span className={styles.mainText}>
                    판매 기준에 못 미치는 외관을 가진, 상품의 가치가 떨어지는
                    <br/> 농산물을 활용해 훌륭한 상품으로 재탄생 시키는 것을 의미해요
                </span>
            </div>
            <div className={styles.mainBackground}></div>
        </div>

        {/*친환경 활동*/}
        <div className={styles.middleTitle}><p>러블리퍼브와 시작하는<br/>친환경 활동</p>
            <div className={styles.foodBlock}>
                <div className={styles.smallTitle}>왜 푸드리퍼브를 해야할까요?<br/><br/>
                    <span className={styles.blockMainText}>
                        한국의 하루 평균 음식물 쓰레기는 약 1만 5900톤, <br/>그 중 57%가 유통과 조리과정에서 발생하고 있어요
                    </span>
                </div>
                <img src={subImage} alt="sub" className={styles.subImage} />
                <div className={styles.blockMainText}>
                    <p>이렇게 발생한 음식물 쓰레기는 <span className={styles.mainBold}>메탄가스를 배출</span>하고
                    <br/>이산화탄소와 함께 <span className={styles.mainBold}>지구온난화의 주범</span>이 돼요</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Main;