import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostItem from "../../components/Post/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import Header from "../../components/common/Header/Header";
import Modal from "../../components/Modal/Modal/Modal";
import Alert from "../../components/Modal/Alert/Alert";
import axios from "axios";
import PostEdit from "../../components/Post/PostEdit/PostEdit";
import BasicProfile from "../../assets/images/basic-profile-lg.svg";
import {
  PostItemSection,
  CommentSection,
  PostUserImg,
  BtnDisplay,
  WriteComment,
  WriteCommentSection,
  DetailPostWrapper,
} from "./DetailPostStyle";

export default function DetailPost() {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("setting");
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
  const [commentCnt, setCommentCnt] = useState(0);
  const [myPostInfo, setMyPostInfo] = useState(infoToIterate);
  const [shouldFetchPostInfo, setShouldFetchPostInfo] = useState(false);
  const [myImg, setMyImg] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }
  function modalOpen(type, id) {
    setModalShow(true);
    setModalType(type);
    setSelectedId(id);
  }

  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }
  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${selectedId ?? id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const post = response.data.post;
      setMyPostInfo(post);
      setShouldFetchPostInfo(false);
    } catch (error) {
      navigate("/error");
    }
  };
  function alertOpen() {
    setAlertShow(true);
  }
  const uploadComment = async () => {
    try {
      const res = await axios.post(
        `https://api.mandarin.weniv.co.kr/post/${id}/comments`,
        {
          comment: {
            content: inputValue,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setInputValue("");
      loadcommentList();
      setComment(res.data.comment);
      setInputValue("");
    } catch (err) {}
  };
  const loadcommentList = async () => {
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${id}/comments/?limit=Number&skip=Number`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setCommentList(res.data.comments);
      setCommentCnt(res.data.comments.length);
    } catch (err) {}
  };
  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        "https://api.mandarin.weniv.co.kr/user/myinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
    setModalShow(false);
  };
  useEffect(() => {
    loadcommentList();
    if (shouldFetchPostInfo) {
      fetchPostInfo();
    }
  }, [comment, shouldFetchPostInfo]);

  useEffect(() => {
    getUserInfo();
  }, []);

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
          <Comment commentList={commentList} postId={id} />
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
      {modalShow && (
        <Modal
          type={modalType}
          modalClose={modalClose}
          alertOpen={alertOpen}
          postId={selectedId}
          handlerPostEdit={openPostEditModal}
        />
      )}
      {alertShow && (
        <Alert type="logout" alertClose={alertClose} postId={selectedId} />
      )}
      {postEditModalOpen && (
        <PostEdit
          closeModal={closePostEditModal}
          postId={selectedId}
          postInfo={infoToIterate}
        />
      )}
    </>
  );
}

//수정 부분 확인 요망--------
