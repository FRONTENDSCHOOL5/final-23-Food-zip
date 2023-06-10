import React from "react";
import styled from "styled-components";
// import PostItem from "../Profile/PostItem";
import IconAlbumOff from "../../assets/images/icon-post-album-off.svg";
import IconAlbumOn from "../../assets/images/icon-post-album-on.svg";
import IconListOff from "../../assets/images/icon-post-list-off.svg";
import IconListOn from "../../assets/images/icon-post-list-on.svg";

const PostListDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  width: 390px;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
  margin-top: 6px;
`;

const PostListBtn = styled.button`
  padding: 4px;
  margin-left: 10px;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
`;

const PostItemList = styled.div`
  width: 390px;
  height: 480px;
  box-shadow: inset 0 0 0 1px green;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  /* background-color: #f2f2f2; */
  background-color: white;
  padding: 16px 0 30px;
`;

export default function PostList() {
  return (
    <>
      <PostListDiv>
        <PostListBtn type="button">
          <img src={IconListOn} alt="리스트형 아이콘" />
        </PostListBtn>
        <PostListBtn type="button">
          <img src={IconAlbumOff} alt="앨범형 아이콘" />
        </PostListBtn>
      </PostListDiv>
      <PostItemList></PostItemList>
    </>
  );
}
