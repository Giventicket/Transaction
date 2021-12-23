# Transaction
  Node.js 마이크로서비스 코딩 공작소를 학습하면서 실습한 쇼핑몰의 api입니다. http 모듈을 기반으로 REST api를 제작하였고 GOOGLE CLOUD PLATFORM을 기반으로 database와 벡엔드 서버를 구축하였습니다.

## <a href="https://seo-jun-pyo.gitbook.io/transaction/">git book<a/>
  위의 링크에서 api 상세에 대한 내용을 기술했습니다. 벡엔드 서버는 90일 뒤에 만료 예정입니다.

## 기술 스택
  <p>
    <img src="https://img.shields.io/badge/javascript-E5C2B6?style=flat-square&logo=javascript&logoColor=white">
    <img src="https://img.shields.io/badge/docker-E5CEE6?style=flat-square&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/googlecloud-0F00FF?style=flat-square&logo=googlecloud&logoColor=white">
  <p/>

## 파일 구성
  <p align="center"><img src="https://user-images.githubusercontent.com/39179946/147264946-bcb2bf62-048f-4657-ba4d-106c12ec079c.png"><p/>
  
##  비지니스 로직 호출과정(예시)
  <p align="center"><img src="https://user-images.githubusercontent.com/39179946/147267289-4a4acc92-76bd-449f-87ec-44418f6d6666.png"><p/>

## 아키텍쳐
  <p align="center"><img src="https://user-images.githubusercontent.com/39179946/147266469-52831767-2b26-4ed6-ba52-f304d3820204.png"><p/>
  sudo docker build . -t transaction
  <br/>
  docker run -p 8080:8080 -d transaction
