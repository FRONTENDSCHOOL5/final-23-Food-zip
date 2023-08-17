import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostItem from "../../components/Post/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import Header from "../../components/common/Header/Header";
import Modal from "../../components/Modal/Modal/Modal";
// import Alert from "../../components/Modal/Alert/Alert";
import PostEdit from "../../components/Post/PostEdit/PostEdit";
import BasicProfile from "../../assets/images/basic-profile-lg.svg";
import { postInfoApi } from "../../api/post";
import { commentListApi, commentUploadApi } from "../../api/comment";
import { userInfoApi } from "../../api/user";
import {
  PostItemSection,
  CommentSection,
  PostUserImg,
  BtnDisplay,
  WriteComment,
  WriteCommentSection,
  DetailPostWrapper,
  CommentWrapper,
} from "./DetailPostStyle";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

export default function DetailPost() {
  // const [modalShow, setModalShow] = useState(false);
  // const [modalType, setModalType] = useState("setting");
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [postEditModalOpen, setPostEditModalOpen] = useState(false);
  const location = useLocation();
  const [comment, setComment] = useState([]);
  const data = location.state;
  const token = localStorage.getItem("token");
  const where = localStorage.getItem("accountname");
  const { id, infoToIterate } = data;
  const [commentCnt, setCommentCnt] = useState(infoToIterate.commentCount);
  const [myPostInfo, setMyPostInfo] = useState(infoToIterate);
  const [shouldFetchPostInfo, setShouldFetchPostInfo] = useState(false);
  const [myImg, setMyImg] = useState("");
  // const [alertShow, setAlertShow] = useState(false);
  const navigate = useNavigate();

  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(true);
  const observer = useRef();
  // console.log("!!", infoToIterate);
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  console.log("상세페이지의 댓글 개수:", infoToIterate.commentCount);
  // function modalClose(e) {
  //   if (e.target === e.currentTarget) {
  //     setModalShow(false);
  //   }
  // }
  // function modalOpen(type, id) {
  //   setModalShow(true);
  //   setModalType(type);
  //   setSelectedId(id);
  // }
  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = (type, id) => {
    setModal({
      show: true,
      type,
      postId: id,
    });
  };

  const fetchPostInfo = async () => {
    try {
      const res = await postInfoApi(id, token);
      const post = res.data.post;
      setMyPostInfo(post);
      setShouldFetchPostInfo(false);
    } catch (error) {
      navigate("/error");
      console.log("fetch오류");
    }
  };
  const uploadComment = async () => {
    try {
      const res = await commentUploadApi(id, inputValue, token);
      setInputValue("");
      console.log("실행됨!");
      loadCommentList();
      setCommentList(prev => [res.data.comment, ...prev]);
      setComment(res.data.comment);
      setCommentCnt(prev => prev + 1);
      setInputValue("");
    } catch (err) {}
  };
  const getCommentList = async options => {
    const res = await commentListApi(options);
    // setCommentList(res.data.comments);
    return res.data.comments;
  };
  const loadCommentList = async options => {
    try {
      const comments = await getCommentList(options);

      const uniqueComments = comments.filter(
        newComment =>
          !commentList.some(
            existingComment => existingComment.id === newComment.id,
          ),
      );

      setCommentList(prevComments => [...prevComments, ...uniqueComments]);

      setSkip(prev => prev + uniqueComments.length);
    } catch (err) {}
  };

  const getUserInfo = async () => {
    try {
      const res = await userInfoApi(token);
      const image = res.data.user;
      setMyImg(image);
    } catch (error) {
      navigate("/error");
    }
  };
  const openPostEditModal = () => {
    setPostEditModalOpen(true);
  };

  const closePostEditModal = () => {
    setPostEditModalOpen(false);
    setShouldFetchPostInfo(true);
    setModal(prevModal => ({ ...prevModal, show: false }));
  };
  useEffect(() => {
    loadCommentList();
    if (shouldFetchPostInfo) {
      fetchPostInfo();
    }
  }, [shouldFetchPostInfo]);

  //   useEffect(() => {
  //     fetchPostInfo();
  //     loadcommentList();
  //     if (shouldFetchPostInfo || myPostInfo.hearted) {
  //       fetchPostInfo();
  //     }
  //   }, [comment, shouldFetchPostInfo, myPostInfo.hearted]);

  useEffect(() => {
    getUserInfo();
    fetchPostInfo();
  }, []);

  // 댓글 무한 스크롤
  useEffect(() => {
    const onIntersect = entries => {
      const target = entries[0];
      if (target.isIntersecting) setPage(p => p + 1);
      // console.log("감지됨", target.isIntersecting);
    };
    const io = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer]);

  useEffect(() => {
    console.log("실행됩니다유");
    if (page === 0) return;
    loadCommentList({ id, token, limit: 14, skip });
  }, [page]);

  return (
    <>
      <Header
        type="profile"
        active={true}
        modalOpen={() => modalOpen("setting")}
      />
      <DetailPostWrapper>
        <PostItemSection>
          <PostItem
            modalOpen={() =>
              modalOpen(
                where === infoToIterate.author.accountname
                  ? "modification"
                  : "report",
                myPostInfo.id,
              )
            }
            postInfo={myPostInfo}
            commentCnt={commentCnt}
            getUserInfo={fetchPostInfo}
          />
        </PostItemSection>
        <CommentSection>
          <CommentWrapper>
            <Comment
              commentList={commentList}
              postId={id}
              loadCommentList={loadCommentList}
            />
          </CommentWrapper>
          <div ref={observer} />
        </CommentSection>
        <WriteCommentSection>
          <PostUserImg src={myImg.image || BasicProfile} alt="사용자 이미지" />
          <WriteComment
            type="text"
            placeholder="댓글 입력하기"
            value={inputValue}
            onChange={handleInputChange}
          />
          <BtnDisplay
            type="submit"
            onClick={uploadComment}
            hasText={inputValue.trim().length > 0}
          >
            게시
          </BtnDisplay>
        </WriteCommentSection>
      </DetailPostWrapper>
      {modal.show && (
        <Modal
          type={modal.type}
          // modalClose={modalClose}
          // alertOpen={alertOpen}
          // postId={selectedId}
          handlerPostEdit={openPostEditModal}
        />
      )}
      {/* {alertShow && (
        <Alert type="logout" alertClose={alertClose} postId={modal.postId} />
      )} */}
      {postEditModalOpen && (
        <PostEdit
          closeModal={closePostEditModal}
          postId={modal.postId}
          // postInfo={infoToIterate}
        />
      )}
    </>
  );
}
