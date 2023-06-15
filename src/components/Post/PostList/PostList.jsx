import React, { useState } from "react";
import styled from "styled-components";
import PostItem from "../PostItem/PostItem";
import IconAlbumOff from "../../../assets/images/icon-post-album-off.svg";
import IconAlbumOn from "../../../assets/images/icon-post-album-on.svg";
import IconListOff from "../../../assets/images/icon-post-list-off.svg";
import IconListOn from "../../../assets/images/icon-post-list-on.svg";

const PostListDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  width: 390px;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;

const PostListBtn = styled.button`
  padding: 4px;
  margin-left: 10px;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
`;

const PostItemList = styled.ul`
  width: 100%;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background-color: white;
  padding: 16px 20px 60px;
  box-sizing: border-box;
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

const GridItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 114px);
  /* grid-template-rows: repeat(3, 114px); */
  gap: 8px;
  padding: 16px 16px 80px 16px;
  overflow: auto;
  /* width: 100%; */
  /* max-width: 390px; */
  height: 480px;
  /* box-sizing: border-box; */
  background-color: white;
`;

const PostGridImg = styled.a`
  position: relative;
  width: 114px;
  height: 114px;
  background-size: cover;
  /* background: url(${props =>
    props.image}) no-repeat center center / cover; */
  background: url("http://localhost:3000/static/media/post-test.dc757e448c096f10e4c7.png")
    no-repeat center center / cover;
  cursor: pointer;
  overflow: auto;
`;

export default function PostList() {
  const [viewMode, setViewMode] = useState("list");

  const handleViewModeChange = mode => {
    setViewMode(mode);
  };

  return (
    <>
      <PostListDiv>
        <PostListBtn type="button" onClick={() => handleViewModeChange("list")}>
          <img
            src={viewMode === "list" ? IconListOn : IconListOff}
            alt="리스트형 아이콘"
          />
        </PostListBtn>
        <PostListBtn
          type="button"
          onClick={() => handleViewModeChange("album")}
        >
          <img
            src={viewMode === "album" ? IconAlbumOn : IconAlbumOff}
            alt="앨범형 아이콘"
          />
        </PostListBtn>
      </PostListDiv>
      {viewMode === "list" ? (
        <PostItemList>
          <PostItem />
        </PostItemList>
      ) : (
        <GridItemList>
          <PostGridImg />
        </GridItemList>
      )}
    </>
  );
}
