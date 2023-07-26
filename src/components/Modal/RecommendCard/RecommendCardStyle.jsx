import styled from "styled-components";
import ImgStar from "../../../assets/images/star.svg";

const RecommendDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 390px;
`;

const RecommendCardArticle = styled.article`
  width: 304px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RecommendListImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const RecommendTextSection = styled.section`
  padding: 13px;
  position: relative;
`;

const RecommendName = styled.h4`
  font-size: 17px;
  margin-bottom: 13px;
  line-height: 20px;
  font-weight: 600;
  display: inline-block;
`;

const RecommendScoreSpan = styled.span`
  display: inline-block;
  color: #000;
  position: relative;
  padding-left: 23px;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  &::after {
    display: block;
    content: "";
    width: 16px;
    height: 16px;
    background-image: url(${ImgStar});
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 45%;
    left: 4px;
    transform: translateY(-50%);
  }
`;

const RecommendLocationP = styled.p`
  font-size: 15px;
  margin-bottom: 27px;
  line-height: 17px;
`;

const RecommendMoreBtn = styled.button`
  position: absolute;
  top: 8%;
  right: 1%;
`;

const RecommendCloseBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
`;

export {
  RecommendDiv,
  RecommendCardArticle,
  RecommendListImg,
  RecommendTextSection,
  RecommendName,
  RecommendScoreSpan,
  RecommendLocationP,
  RecommendMoreBtn,
  RecommendCloseBtn,
};
