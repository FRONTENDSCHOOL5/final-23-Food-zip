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
} from "./PostListStyle";
import { userPostListApi } from "../../../api/post";
import sprite from "../../../assets/images/SpriteIcon.svg";
import Stack from "../../../assets/images/stack.svg";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/modalAtom";
import { useRef } from "react";

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
  const [hasPosts, setHasPosts] = useState(false);
  const [postEditModalOpen, setPostEditModalOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const observer = useRef();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await userPostListApi(
        accountname || localStorage.getItem("accountname"),
        token,
        limit,
        skip,
      );
      const posts = res.data.post;
      setSkip(prev => prev + posts.length);
      if (posts.length === 0 && page === 0) {
        setHasPosts(false);
      } else {
        setHasPosts(true);
        setPostInfo(prev => [...prev, ...posts]);
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
    window.location.reload();
  };

  useEffect(() => {
    const onIntersect = entries => {
      const target = entries[0];
      if (target.isIntersecting) setPage(p => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 1 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer]);

  useEffect(() => {
    if (page === 0) return;
    getUserInfo(limit, skip);
  }, [page]);

  useEffect(() => {
    setSkip(0);
    setPage(0);
    setPostInfo([]);
  }, [location]);

  return (
    <>
      {hasPosts && (
        <>
          <PostListSection>
            <PostListBtn
              type="button"
              onClick={() => handleViewModeChange("list")}
              aria-label="게시물 리스트 타입으로 보기 버튼"
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
              aria-label="게시물 앨범 형태로 보기 버튼"
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
                      modalOpen(!accountname ? "deletePost" : "report", item.id)
                    }
                    postInfo={item}
                    getUserInfo={getUserInfo}
                    commentCnt={item.commentCount}
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
                        <SocialSVG id="icon-heart" size={19} />
                        {item.heartCount}
                      </Likes>
                      <Comments>
                        <SocialSVG id="icon-message-circle" size={18} />
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
      <div ref={observer} />
      {modal.show && (
        <Modal type={modal.type} handlerPostEdit={openPostEditModal} />
      )}
      {postEditModalOpen && (
        <PostEdit closeModal={closePostEditModal} postId={modal.postId} />
      )}
    </>
  );
}
