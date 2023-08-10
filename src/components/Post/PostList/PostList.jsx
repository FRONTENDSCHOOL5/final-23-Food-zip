import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  IconContainer,
  Icon,
  Likes,
  Comments,
  InfoContainer,
  GridIconImg,
} from "./PostListStyle";
import { userPostListApi } from "../../../api/post";
import sprite from "../../../assets/images/SpriteIcon.svg";
import Stack from "../../../assets/images/stack.svg";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/modalAtom";

export default function PostList() {
  const [viewMode, setViewMode] = useState("list");
  const location = useLocation();
  const navigate = useNavigate();
  const SocialSVG = ({ id, color = "white", size = 26 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
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

  // const [modalShow, setModalShow] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);

  // function modalClose(e) {
  //   if (e.target === e.currentTarget) {
  //     setModalShow(false);
  //   }
  // }

  // function modalOpen(id) {
  //   setSelectedId(id);
  //   setModalShow(true);
  // }
  const [modal, setModal] = useRecoilState(modalState);

  // const modalOpen = id => {
  //   setModal({
  //     show: true,
  //     type: !accountname ? "modification" : "report",
  //     postId: id,
  //   });
  // };

  const modalOpen = (type, id) => {
    setModal({
      show: true,
      type,
      postId: id,
    });
  };

  const openPostEditModal = () => {
    setPostEditModalOpen(true);
  };

  const closePostEditModal = () => {
    setPostEditModalOpen(false);
    setModal(prevModal => ({ ...prevModal, show: false }));
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
              <SocialSVG
                id={
                  viewMode === "list"
                    ? "icon-post-list-on"
                    : "icon-post-list-off"
                }
              />
            </PostListBtn>
            <PostListBtn
              type="button"
              onClick={() => handleViewModeChange("album")}
            >
              <SocialSVG
                id={
                  viewMode === "album"
                    ? "icon-post-album-on"
                    : "icon-post-album-off"
                }
              />
            </PostListBtn>
          </PostListSection>
          {viewMode === "list" ? (
            <PostItemList>
              {postInfo.map(item => (
                <PostListItem key={item.id}>
                  <PostItem
                    modalOpen={() =>
                      modalOpen(
                        !accountname ? "modification" : "report",
                        item.id,
                      )
                    }
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
                      <img
                        src={
                          item.image.startsWith("https://")
                            ? item.image.split(",")[0].trim()
                            : `https://api.mandarin.weniv.co.kr/${item.image
                                .split(",")[0]
                                .trim()}`
                        }
                        alt="grid 이미지"
                      />
                    )}
                    {item.image.includes(",") && (
                      <IconContainer>
                        <Icon src={Stack} />
                      </IconContainer>
                    )}
                    <InfoContainer>
                      <Likes>
                        <SocialSVG id="icon-heart" />
                        {item.heartCount}
                      </Likes>
                      <Comments>
                        <SocialSVG id="icon-message-circle-1" />
                        {item.commentCount}
                      </Comments>
                    </InfoContainer>
                  </PostGridImg>
                </GridItemList>
              ))}
            </GridItemWrap>
          )}
        </>
      )}
      {modal.show && (
        <Modal
          type={modal.type}
          // modalClose={modalClose}
          // postId={selectedId}
          handlerPostEdit={openPostEditModal}
        />
      )}
      {postEditModalOpen && (
        <PostEdit
          closeModal={closePostEditModal}
          postId={modal.postId}
          // postInfo={postInfo}
        />
      )}
    </>
  );
}
