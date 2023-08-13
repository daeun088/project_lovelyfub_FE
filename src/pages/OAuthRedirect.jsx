import React from 'react';
import { useLocation } from 'react-router-dom';

const OAuthRedirect = () => {
 // 리다이렉트 url의 queryString에서 accessToken 가져오기
 const location = useLocation(0);
 const queryString = location.search.replace('?accessToken=', '');
 const accessToken = 'Bearer ' + queryString;
 // 가져온 accessToken을 쿠키에 저장(보안적으로 가장 좋은 방법은 redux 등의 상태 관리 라이브러리를 사용하는 것입니다.)
 let todayDate = new Date();
 todayDate.setDate(todayDate.getDate()+1);
 const expires = todayDate.toUTCString(); // 쿠키의 만료 일자 설정
 document.cookie =`AccessToken=${accessToken}; path=/; expires=${expires};`;
 // 그 후, 메인 페이지로 이동
 window.location.href = '/#/main';
 
 return <div></div>;
};
export default OAuthRedirect;
