import React from 'react';
import styles from './mainbottom.module.scss';
import subImage2 from './image/sub_image2.png';
import subImage3 from './image/sub_image3.png';
import subImage4 from './image/sub_image4.png';


function Mainbottom() {
  return (
    <div>
        <div className={styles.middleTitle}>
            <span className={styles.subBlockheight}>
                <p>지속가능한 미래를 위한,<br/>
                    <span className={styles.underline}>러블리퍼브의 미션<br/></span>
                </p>
                <div className={styles.subBlock}>
                    <div className={styles.smallTitle}>
                        <span className={styles.titleBlack}>푸드리퍼브 시장의 활성화<br/><br/>
                            <span className={styles.blockMainText}>
                                <span className={styles.titleBlack}>
                                푸드리퍼브를 실천하는 착한 식당과 마켓을 소개하고,많은 분들의<br/> 
                                방문을 이끌어 푸드리퍼브 시장이 활성화 되도록 만들게요!<br/><br/>
                                </span>
                            </span>
                        </span>
                    </div>
                    <img src={subImage2} alt="sub" className={styles.subImage} />
                </div>

                <div className={styles.subBlock}>
                    <div className={styles.smallTitle}>
                        <span className={styles.titleBlack}>지구보호 첫 걸음의 길잡이<br/><br/>
                            <span className={styles.blockMainText}>
                                <span className={styles.titleBlack}>
                                어렵고 불편한 환경 지키기가 아닌 맛있는 음식을 먹는<br/>
                                쉬운 미션을 통한 지구보호 첫걸음의 길잡이가 될게요!<br/><br/>
                                </span>
                            </span>
                        </span>
                    </div>
                    <img src={subImage3} alt="sub" className={styles.potatoImage} />
                </div>

                <div className={styles.subBlock}>
                    <div className={styles.smallTitle}>
                        <span className={styles.titleBlack}>농가의 못난이 채소 문제 해결<br/><br/>
                            <span className={styles.blockMainText}>
                                <span className={styles.titleBlack}>
                                외관상의 이유로 버려지는 식자재에 가치를 부여하고,<br/>
                                농가의 못난이 채소 문제를 해결하도록 할게요!<br/><br/>
                                </span>
                            </span>
                        </span>
                    </div>
                    <img src={subImage4} alt="sub" className={styles.subImage} />
                </div>

            </span>
        </div>

    </div>
  );
}

export default Mainbottom;