import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserImg from "../../../assets/images/basic-profile-sm.svg";
import PostTestImg from "../../../assets/images/post-test.png";
import MoreIcon from "../../../assets/images/s-icon-more-vertical.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../Modal/Alert";
import Modal from "../../Modal/Modal";

const Container = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;
const PostUser = styled.div`
  display: flex;
  gap: 13px;
`;
const PostUserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;
const PostUserBox = styled.a`
  align-self: center;
`;
const PostUserName = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;
const PostUserId = styled.p`
  font-size: 12px;
  color: #767676;
`;
const PostContent = styled.div`
  width: 100%;
  margin: 17px 0;
  font-size: 14px;
  line-height: 17px;
`;
const PostImg = styled.img`
  display: block;
  width: 100%;
  height: 228px;
  margin: 17px 0 12px;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;
const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PostBtnBox = styled.div`
  display: flex;
  gap: 16px;
`;
const PostDate = styled.p`
  font-size: 10px;
  color: #767676;
`;
const BtnLike = styled.button`
  width: 41px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
`;
const BtnComment = styled.button`
  width: 38px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
`;
const BtnImg = styled.img`
  width: 20px;
  height: 20px;
`;
const BtnMore = styled.button`
  width: 18px;
  height: 18px;
  background: url(${MoreIcon});
  position: absolute;
  top: 7px;
  right: 0;
`;
export default function PostItem({ postInfo, authorInfo }) {
  const navigate = useNavigate();
  function moveDetail() {
    navigate("/detailpost");
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

  return (
    <>
      {postInfo?.map(item => (
        <Container key={item.id}>
          <PostUser>
            <PostUserImg src={authorInfo.image} alt="사용자 이미지" />
            <PostUserBox>
              <PostUserName>{authorInfo.username}</PostUserName>
              <PostUserId>@ {authorInfo.accountname}</PostUserId>
            </PostUserBox>
          </PostUser>
          <PostContent>
            <p>{item.content}</p>
            <PostImg src={item.image} alt="포스트 이미지" />
            <PostInfoBox>
              <PostBtnBox>
                <BtnLike>
                  <BtnImg
                    src={
                      require("../../../assets/images/icon-heart.svg").default
                    }
                    alt="게시글 좋아요"
                  />
                  58
                </BtnLike>
                <BtnComment onClick={moveDetail}>
                  <BtnImg
                    src={
                      require("../../../assets/images/icon-message-circle-1.svg")
                        .default
                    }
                    alt="게시글 댓글"
                  />
                  12
                </BtnComment>
              </PostBtnBox>
              <PostDate>{item.updatedAt}</PostDate>
            </PostInfoBox>
          </PostContent>
          <BtnMore onClick={() => modalOpen(item.id)}></BtnMore>
          {modalShow && (
            <Modal
              type="modification"
              modalClose={modalClose}
              id={selectedId}
            />
          )}
        </Container>
      ))}
    </>
  );
}
