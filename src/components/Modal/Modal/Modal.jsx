import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import {
  ModalDiv,
  ModalWrapArticle,
  ModalLineSpan,
  ModalTextBtn,
} from "./ModalStyle";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/modalAtom";
import { cardShowState } from "../../../atoms/cardShowAtom";

export default function Modal({
  type,
  // modalClose,
  // postId,
  productId,
  // commentId,
  restaurantName,
  handlerPostEdit,
  handlerRecommendEdit,
  handleCommentDelete,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState("logout");
  const [modal, setModal] = useRecoilState(modalState);
  const [cardShow, setCardShow] = useRecoilState(cardShowState);
  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModal(prevModal => ({ ...prevModal, show: false }));
    }
  }
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }
  function alertOpen(type) {
    setAlertShow(true);
    setAlertType(type);
  }
  function handlerOpenMap() {
    navigate("/map", {
      state: {
        restaurantname: restaurantName,
      },
    });
    setModal(prevModal => ({ ...prevModal, show: false }));
    setCardShow(false);
  }
  const UI = {
    setting: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn>설정 및 개인정보</ModalTextBtn>
        <ModalTextBtn onClick={() => alertOpen("logout")}>
          로그아웃
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    deletePost: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("post")}>삭제</ModalTextBtn>
      </ModalWrapArticle>
    ),
    modification: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("post")}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerPostEdit}>수정</ModalTextBtn>
      </ModalWrapArticle>
    ),
    product: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("product")}>삭제</ModalTextBtn>
        <ModalTextBtn onClick={handlerRecommendEdit}>수정</ModalTextBtn>
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn>SNS 공유하기</ModalTextBtn>
      </ModalWrapArticle>
    ),
    yourproduct: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={handlerOpenMap}>
          카카오맵으로 이동하기
        </ModalTextBtn>
        <ModalTextBtn>SNS 공유하기</ModalTextBtn>
      </ModalWrapArticle>
    ),
    report: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn
          onClick={() =>
            alertOpen(modal.commentId ? "commentReport" : "postReport")
          }
        >
          신고하기
        </ModalTextBtn>
      </ModalWrapArticle>
    ),
    delete: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => alertOpen("comment")}>삭제</ModalTextBtn>
      </ModalWrapArticle>
    ),
    chat: (
      <ModalWrapArticle>
        <ModalLineSpan />
        <ModalTextBtn onClick={() => navigate(-1)}>채팅방 나가기</ModalTextBtn>
      </ModalWrapArticle>
    ),
  };

  return (
    <>
      <ModalDiv onClick={modalClose}>{UI[type]}</ModalDiv>
      {alertShow && (
        <Alert
          type={alertType}
          modalClose={modalClose}
          alertClose={alertClose}
          // postId={modal.postId}
          productId={productId}
          // commentId={commentId}
          handleCommentDelete={handleCommentDelete}
        />
      )}
    </>
  );
}
