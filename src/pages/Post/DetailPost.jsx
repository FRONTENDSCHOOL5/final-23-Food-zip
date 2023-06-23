import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostItem from "../../components/Post/PostItem/PostItem";
import Comment from "../../components/Comment/Comment";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import Modal from "../../components/Modal/Modal";
import Alert from "../../components/Modal/Alert";
import axios from "axios";

const DetailPostWrapper = styled.div`
  background: #fff;
  width: 100%;
  height: 100vh;
  padding: 68px 0 0 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const PostItemSection = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;
const WriteCommentSection = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 18px;
  padding: 12.5px 16px;
  justify-content: baseline;
  background-color: #fff;
  width: 100%;
  max-width: 390px;
  box-sizing: border-box;
  /* height: 287px; */
`;

const WriteComment = styled.input`
  border: none;
  flex-grow: 1;
`;

const BtnDisplay = styled.button`
  color: ${({ hasText }) => (hasText ? "#286140" : "#C4C4C4")};
`;

const PostUserImg = styled.img`
  width: 30px;
  height: 30px;
`;
const CommentSection = styled.div`
  width: 100%;
  padding: 5px 15px 0;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  flex-grow: 1;
  flex-shrink: 0;
  overflow: auto;
`;

export default function DetailPost() {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("setting");
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [comment, setComment] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = event => {
    setInputValue(event.target.value);
    console.log("댓글 입력창 :", inputValue);
  };
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(type, id) {
    console.log("type", type);
    setModalShow(true);
    setModalType(type);
    setSelectedId(id);
  }

  const [alertShow, setAlertShow] = useState(false);
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }

  function alertOpen() {
    setAlertShow(true);
  }
  const location = useLocation();
  const data = location.state;

  const postId = data.id;
  const { id, postInfo, authorInfo, accountname, otherInfo } = data;
  const infoToIterate = postInfo || otherInfo;
  console.log("who", infoToIterate[0].author);

  const where = localStorage.getItem("accountname");
  const token = localStorage.getItem("token");
  const uploadComment = async () => {
    try {
      const res = await axios.post(
        `https://api.mandarin.weniv.co.kr/post/${postId}/comments`,
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
      setComment(res.data.comment);
      console.log("댓글 입력됨 ", res.data.comment);
      setInputValue("");
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const loadcommentList = async () => {
    try {
      const res = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        },
      );
      setCommentList(res.data.comments);
      console.log("댓글리스트", res.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadcommentList();
  }, [comment]);
  return (
    <>
      <Header
        type="profile"
        active={true}
        modalOpen={() => modalOpen("setting")}
      />
      <DetailPostWrapper>
        {infoToIterate?.map(
          item =>
            item.id === id && (
              <PostItemSection key={item.id}>
                <PostItem
                  modalOpen={() =>
                    modalOpen(
                      where === authorInfo.accountname
                        ? "modification"
                        : "report",

                      item.id,
                    )
                  }
                  postInfo={[item]}
                  authorInfo={item.author}
                />
              </PostItemSection>
            ),
        )}
        <CommentSection>
          <Comment
            commentList={commentList}
            modalOpen={() => modalOpen("report")}
          />
        </CommentSection>
        <WriteCommentSection>
          <PostUserImg
            src={require("../../assets/images/basic-profile-sm.svg").default}
            alt="사용자 이미지"
          />
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
        />
      )}
      {alertShow && (
        <Alert type="logout" alertClose={alertClose} postId={selectedId} />
      )}
    </>
  );
}
