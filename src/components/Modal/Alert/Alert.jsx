import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDiv,
  AlertWrapArticle,
  AlertTextP,
  AlertBottomSection,
  AlertCancelBtn,
  AlertMainBtn,
  AlertLineSpan,
} from "./AlertStyle";
import { postDeleteApi, postReportApi } from "../../../api/post";
import { recommendDeleteApi } from "../../../api/recommend";
import { commentDeleteApi, commentReportApi } from "../../../api/comment";
import { userInfoApi } from "../../../api/user";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/modalAtom";
import { cardShowState } from "../../../atoms/cardShowAtom";

export default function Alert({
  type,
  alertClose,
  modalClose,
  productId,
  handleCommentDelete,
}) {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalState);
  const [cardShow, setCardShow] = useRecoilState(cardShowState);
  const onClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountname");
    localStorage.removeItem("_id");
    localStorage.removeItem("follow");
    navigate("/welcome");
    setModal(prevModal => ({ ...prevModal, show: false }));
  };
  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    try {
      await postDeleteApi(modal.postId, token);
      alertClose("post");
      navigate("/myprofile");
      modalClose("modification");
      try {
        await userInfoApi(token);
      } catch (error) {
        console.error("Failed to fetch post info:", error);
      }
    } catch (error) {
      console.error("Delete request failed", error);
      navigate("/error");
    }
  };
  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      await recommendDeleteApi(productId, token);
      alertClose("product");
      modalClose("product");
      navigate("/myprofile");
      setCardShow(false);
    } catch (error) {
      console.error("Delete request failed", error);
      navigate("/error");
    }
  };

  const handleDeleteComment = async () => {
    const token = localStorage.getItem("token");
    try {
      await commentDeleteApi(modal.postId, modal.commentId, token);
      alertClose("comment");
      modalClose("delete");
      handleCommentDelete(modal.commentId);
    } catch (error) {
      console.error("Delete request failed", error);
    }
  };
  const handleReportComment = async () => {
    const token = localStorage.getItem("token");
    try {
      await commentReportApi(modal.postId, modal.commentId, token);
      alertClose("report");
      modalClose("report");
      alert("해당 댓글을 신고하였습니다.");
    } catch (error) {
      console.error("Delete request failed", error);
    }
  };
  const handleReportPost = async () => {
    const token = localStorage.getItem("token");
    try {
      await postReportApi(modal.postId, token);
      alertClose("report");
      modalClose("report");
      alert("해당 게시글을 신고하였습니다.");
    } catch (error) {
      console.error("Delete request failed", error);
    }
  };
  const UI = {
    logout: (
      <AlertWrapArticle>
        <AlertTextP>로그아웃하시겠어요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={onClickLogout}>로그아웃</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    post: (
      <AlertWrapArticle>
        <AlertTextP>게시글을 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleDeletePost}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    product: (
      <AlertWrapArticle>
        <AlertTextP>맛집을 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleDeleteProduct}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    comment: (
      <AlertWrapArticle>
        <AlertTextP>댓글을 삭제할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleDeleteComment}>삭제</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    postReport: (
      <AlertWrapArticle>
        <AlertTextP>게시글을 신고할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleReportPost}>확인</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
    commentReport: (
      <AlertWrapArticle>
        <AlertTextP>댓글을 신고할까요?</AlertTextP>
        <AlertBottomSection>
          <AlertCancelBtn onClick={alertClose}>취소</AlertCancelBtn>
          <AlertLineSpan></AlertLineSpan>
          <AlertMainBtn onClick={handleReportComment}>확인</AlertMainBtn>
        </AlertBottomSection>
      </AlertWrapArticle>
    ),
  };

  return <AlertDiv>{UI[type]}</AlertDiv>;
}
