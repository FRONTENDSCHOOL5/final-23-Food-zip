import styled from "styled-components";

const RecommendWrap = styled.section`
  width: 100%;
  padding: 20px 16px 8px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  &::-webkit-scrollbar {
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const RecommendTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const RecommendListUl = styled.ul`
  display: flex;
  gap: 8px;
  & :last-child {
    padding-right: 8px;
  }
`;

const RecommendLiBtn = styled.button`
  text-align: left;
`;

const RecommendListImg = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecommendNameP = styled.p`
  font-size: 14px;
  margin: 6px 0 2px;
  display: block;
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RecommendScoreSpan = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-left: 2px;
  line-height: 17px;
`;

export {
  RecommendWrap,
  RecommendTitle,
  RecommendListUl,
  RecommendLiBtn,
  RecommendListImg,
  RecommendNameP,
  RecommendScoreSpan,
};
