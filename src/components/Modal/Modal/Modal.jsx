import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import {
  ModalDiv,
  ModalWrapArticle,
  ModalLineSpan,
  ModalTextBtn,
} from "./ModalStyle";

export default function Modal({
  type,
  modalClose,
  alertOpen,
  postId,
  productId,
  commentId,
  restaurantName,
  handlerPostEdit,
  handlerRecommendEdit,
}) {
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState("logout");

  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }

  function alertOpen(customType) {
    setAlertShow(true);
    setAlertType(customType || type);
  }

  function handlerOpenMap() {
    navigate("/map", {
      state: {
        restaurantname: restaurantName,
      },
    });
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
          onClick={() => alertOpen(commentId ? "commentReport" : "postReport")}
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
          postId={postId}
          productId={productId}
          commentId={commentId}
        />
      )}
    </>
  );
}
