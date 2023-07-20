import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconAlbumOff from "../../../assets/images/icon-post-album-off.svg";
import IconAlbumOn from "../../../assets/images/icon-post-album-on.svg";
import IconListOff from "../../../assets/images/icon-post-list-off.svg";
import IconListOn from "../../../assets/images/icon-post-list-on.svg";
import PostItem from "../PostItem/PostItem";
import Modal from "../../Modal/Modal/Modal";
import PostEdit from "../PostEdit/PostEdit";
import {
  PostGridImg,
  PostItemList,
  PostListBtn,
  PostListItem,
  PostListSection,
  GridItemList,
  GridItemWrap,
} from "./PostListStyle";
import { userPostListApi } from "../../../api/post";

export default function PostList({ modalOpen }) {
  const [viewMode, setViewMode] = useState("list");
  const location = useLocation();
  const navigate = useNavigate();
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
      const res = await userPostListApi(
        accountname || localStorage.getItem("accountname"),
        token,
      );
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

  function moveDetail(id, item) {
    navigate(`/detailpost`, {
      state: {
        id: id,
        infoToIterate: item,
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
              {postInfo.map(item => (
                <PostListItem key={item.id}>
                  <PostItem
                    modalOpen={modalOpen}
                    postInfo={item}
                    getUserInfo={getUserInfo}
                  />
                </PostListItem>
              ))}
            </PostItemList>
          ) : (
            <GridItemWrap>
              {postInfo.map(item => (
                <GridItemList hasImage={item.image === ""} key={item.id}>
                  <PostGridImg
                    onClick={() => {
                      moveDetail(item.id, item);
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
