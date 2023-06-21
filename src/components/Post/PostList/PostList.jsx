import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostItem from "../PostItem/PostItem";
import IconAlbumOff from "../../../assets/images/icon-post-album-off.svg";
import IconAlbumOn from "../../../assets/images/icon-post-album-on.svg";
import IconListOff from "../../../assets/images/icon-post-list-off.svg";
import IconListOn from "../../../assets/images/icon-post-list-on.svg";
import axios from "axios";

const PostListDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
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

const GridItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 114px);
  gap: 8px;
  padding: 16px 16px 80px 16px;
  height: 100%;
  min-height: 425px;
  background-color: white;
`;

const PostGridImg = styled.a`
  position: relative;
  width: 114px;
  height: 114px;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
`;

export default function PostList({ post, modalOpen }) {
  const [viewMode, setViewMode] = useState("list");

  const handleViewModeChange = mode => {
    setViewMode(mode);
  };

  const [postInfo, setPostInfo] = useState([]);
  const [authorInfo, setAuthorInfo] = useState([]);
  console.log("여기 작동?");
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const accountname = localStorage.getItem("accountname");
    console.log(token);
    const res = await axios.get(
      `https://api.mandarin.weniv.co.kr/post/${accountname}/userpost`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );

    // console.log("여기");
    // console.log("여기", res.data.post[0].author);
    // const { username, image } = res.data.post.author;
    // setUserInfo({
    //   username,
    //   image,
    // });
    const posts = res.data.post;
    // const postImages = posts.map(item => item.image.split(","));
    // console.log("아마: ", postImages);
    // const combinedInfo = posts.map((item, index) => ({
    //   ...item,
    //   images: postImages[index],
    // }));
    // setPostInfo(combinedInfo);
    // console.log("혹시: ", postInfo);

    if (posts.length === 0) {
      setAuthorInfo([]);
      setPostInfo([]);
    } else {
      const authors = res.data.post[0].author;
      setPostInfo(posts);
      setAuthorInfo(authors);
    }
  };
  console.log("여기", postInfo[0]);
  console.log(authorInfo);
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
          <PostItem
            modalOpen={modalOpen}
            postInfo={postInfo}
            authorInfo={authorInfo}
          />
        </PostItemList>
      ) : (
        <GridItemList>
          {postInfo.map(item => (
            <PostGridImg key={item.id}>
              <img src={item.image} alt="grid" />
            </PostGridImg>
          ))}
        </GridItemList>
      )}
    </>
  );
}
