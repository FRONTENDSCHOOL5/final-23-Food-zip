import styled from "styled-components";

const PostListSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
`;
const PostListItem = styled.li`
  width: 100%;
`;
const PostListBtn = styled.button`
  margin-right: 16px;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
`;

const PostItemList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 16px 20px 60px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

const GridItemWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 114px);
  gap: 8px;
  padding: 16px 16px 80px 16px;
  height: 100%;
  min-height: 425px;
  background-color: white;
`;

const GridItemList = styled.li`
  display: ${props => (props.hasImage ? "none" : "block")};
`;

const PostGridImg = styled.button`
  position: relative;
  width: 114px;
  height: 114px;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export {
  PostGridImg,
  PostItemList,
  PostListBtn,
  PostListItem,
  PostListSection,
  GridItemList,
  GridItemWrap,
};
