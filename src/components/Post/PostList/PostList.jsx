import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import IconAlbumOff from "../../../assets/images/icon-post-album-off.svg";
import IconAlbumOn from "../../../assets/images/icon-post-album-on.svg";
import IconListOff from "../../../assets/images/icon-post-list-off.svg";
import IconListOn from "../../../assets/images/icon-post-list-on.svg";
import PostItem from "../PostItem/PostItem";
import Modal from "../../Modal/Modal/Modal";
import PostEdit from "../PostEdit/PostEdit";

const PostListSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
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

export default function PostList({ post, modalOpen }) {
  const [viewMode, setViewMode] = useState("list");
  const location = useLocation();
  const { accountname } = location.state || {};

  const handleViewModeChange = mode => {
    setViewMode(mode);
  };

  const [postInfo, setPostInfo] = useState([]);
  const [authorInfo, setAuthorInfo] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);
  const [postEditModalOpen, setPostEditModalOpen] = useState(false);
  useEffect(() => {
    getUserInfo();
  }, [location]);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      let apiUrl = `https://api.mandarin.weniv.co.kr/post/${accountname}/userpost/?limit=Number&skip=Number`;

      if (!accountname) {
        const loggedInAccountname = localStorage.getItem("accountname");
        apiUrl = `https://api.mandarin.weniv.co.kr/post/${loggedInAccountname}/userpost/?limit=Number&skip=Number`;
      }
      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      const posts = res.data.post;
      if (posts.length === 0) {
        setHasPosts(false);
        setAuthorInfo([]);
        setPostInfo([]);
      } else {
        const authors = res.data.post[0].author;
        setHasPosts(true);
        setPostInfo(posts);
        setAuthorInfo(authors);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const navigate = useNavigate();

  function moveDetail(id) {
    navigate(`/detailpost`, {
      state: {
        id: id,
        postInfo: postInfo,
        authorInfo: authorInfo,
        accountname: accountname,
      },
    });
  }

  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(id) {
    setSelectedId(id);
    setModalShow(true);
  }

  const openPostEditModal = () => {
    setPostEditModalOpen(true);
  };

  const closePostEditModal = () => {
    setPostEditModalOpen(false);
    setModalShow(false);
    getUserInfo();
  };
  return (
    <>
      {hasPosts && (
        <>
          <PostListSection>
            <PostListBtn
              type="button"
              onClick={() => handleViewModeChange("list")}
            >
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
          </PostListSection>
          {viewMode === "list" ? (
            <PostItemList>
              <PostItem
                modalOpen={modalOpen}
                postInfo={postInfo}
                authorInfo={authorInfo}
                getUserInfo={getUserInfo}
              />
            </PostItemList>
          ) : (
            <GridItemWrap>
              {postInfo.map(item => (
                <GridItemList hasImage={item.image === ""}>
                  <PostGridImg
                    key={item.id}
                    onClick={() => {
                      moveDetail(item.id);
                    }}
                  >
                    {item.image !== "" && (
                      <img src={item.image} alt="grid 이미지" />
                    )}
                  </PostGridImg>
                </GridItemList>
              ))}
            </GridItemWrap>
          )}
        </>
      )}
      {modalShow && (
        <Modal
          type={!accountname ? "modification" : "report"}
          modalClose={modalClose}
          postId={selectedId}
          handlerPostEdit={openPostEditModal}
        />
      )}
      {postEditModalOpen && (
        <PostEdit
          closeModal={closePostEditModal}
          postId={selectedId}
          postInfo={postInfo}
        />
      )}
    </>
  );
}
