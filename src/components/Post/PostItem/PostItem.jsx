import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreIcon from "../../../assets/images/s-icon-more-vertical.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import axios from "axios";

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
  cursor: pointer;
  object-fit: cover;
`;
const PostUserBox = styled.div`
  align-self: center;
  cursor: pointer;
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
  word-break: break-all;
`;
const PostText = styled.p`
  margin-bottom: 17px;
`;
const PostImg = styled.img`
  display: block;
  width: 100%;
  height: 228px;
  margin-bottom: 12px;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;
const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  /* cursor: pointer; */
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
export default function PostItem({
  postInfo,
  authorInfo,
  modalOpen,
  otherInfo,
  getUserInfo,
  commentCnt,
  getOtherInfo,
  myFeed,
  fetchPostInfo,
}) {
  const navigate = useNavigate();
  function moveDetail(id) {
    navigate("/detailpost", {
      state: {
        id: id,
        postInfo: postInfo,
        otherInfo: otherInfo,
        authorInfo: authorInfo,
      },
    });
  }
  console.log("이 정보", otherInfo);
  const postLike = async postId => {
    const token = localStorage.getItem("token");
    try {
      const post = postInfo.find(post => post.id === postId);
      if (!post) {
        console.error("Post not found");
        return false;
      }
      if (post.hearted) {
        const res = await axios.delete(
          `https://api.mandarin.weniv.co.kr/post/${post.id}/unheart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        console.log("좋아요 취소");
      } else {
        const res = await axios.post(
          `https://api.mandarin.weniv.co.kr/post/${post.id}/heart`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        console.log("좋아요", res.data.post.heartCount);
      }
      if (getUserInfo) getUserInfo();
      if (fetchPostInfo) fetchPostInfo();

      console.log(postInfo, "좋아요 요청후 응답");
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const postOtherLike = async postId => {
    const token = localStorage.getItem("token");
    try {
      const post = otherInfo.find(post => post.id === postId);
      if (!post) {
        console.error("Post not found");
        return false;
      }
      console.log("check", post);
      if (post.hearted) {
        const res = await axios.delete(
          `https://api.mandarin.weniv.co.kr/post/${post.id}/unheart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        console.log("좋아요 취소");
      } else {
        const res = await axios.post(
          `https://api.mandarin.weniv.co.kr/post/${post.id}/heart`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );
        console.log("좋아요", res.data.post.heartCount);
      }
      getOtherInfo();
      // shouldFetchPostInfo();
      fetchPostInfo();
      console.log(postInfo, "좋아요 요청후 응답");
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  function moveProfile(accountname) {
    // postInfo가 있는 경우
    const where = localStorage.getItem("accountname");
    if (accountname === where) {
      navigate("/myprofile", {
        state: {
          accountname: accountname,
        },
      });
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
  }

  // otherInfo가 있는 경우
  function moveOtherProfile(accountname) {
    console.log("Go", accountname);
    navigate(`/profile/${accountname}`, {
      state: {
        accountname: accountname,
      },
    });
  }
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
  return (
    <>
      {postInfo
        ? postInfo?.map(item => (
            <Container key={item.id}>
              <PostUser>
                <PostUserImg
                  src={authorInfo.image}
                  alt="사용자 이미지"
                  onClick={() => moveProfile(authorInfo.accountname)}
                />
                <PostUserBox
                  onClick={() => moveProfile(authorInfo.accountname)}
                >
                  <PostUserName>{authorInfo.username}</PostUserName>
                  <PostUserId>@ {authorInfo.accountname}</PostUserId>
                </PostUserBox>
              </PostUser>
              <PostContent>
                <PostText>{item.content}</PostText>
                {item.image !== "" && (
                  <PostImg src={item.image} alt="포스트 이미지" />
                )}
                <PostInfoBox>
                  <PostBtnBox>
                    <BtnLike onClick={() => postLike(item.id)}>
                      {item.hearted ? (
                        <BtnImg
                          src={
                            require("../../../assets/images/icon-heart-fill.svg")
                              .default
                          }
                          alt="게시글 좋아요"
                        />
                      ) : (
                        <BtnImg
                          src={
                            require("../../../assets/images/icon-heart.svg")
                              .default
                          }
                          alt="게시글 좋아요"
                        />
                      )}
                      {item.heartCount}
                    </BtnLike>
                    <BtnComment
                      onClick={() => {
                        moveDetail(item.id);
                      }}
                    >
                      <BtnImg
                        src={
                          require("../../../assets/images/icon-message-circle-1.svg")
                            .default
                        }
                        alt="게시글 댓글"
                      />
                      {commentCnt || item.comments.length}
                    </BtnComment>
                  </PostBtnBox>
                  <PostDate>{formatDate(item.updatedAt)}</PostDate>
                </PostInfoBox>
              </PostContent>
              <BtnMore onClick={() => modalOpen(item.id)}></BtnMore>
            </Container>
          ))
        : otherInfo?.map(item => (
            <Container key={item.id}>
              <PostUser>
                <PostUserImg
                  src={item.author.image}
                  alt="다른사용자 이미지"
                  onClick={() => moveOtherProfile(item.author.accountname)}
                />
                <PostUserBox
                  onClick={() => moveOtherProfile(item.author.accountname)}
                >
                  <PostUserName>{item.author.username}</PostUserName>
                  <PostUserId>@ {item.author.accountname}</PostUserId>
                </PostUserBox>
              </PostUser>
              <PostContent>
                <PostText>{item.content}</PostText>
                {item.image !== "" && (
                  <PostImg src={item.image} alt="포스트 이미지" />
                )}
                <PostInfoBox>
                  <PostBtnBox>
                    <BtnLike onClick={() => postOtherLike(item.id)}>
                      {item.hearted ? (
                        <BtnImg
                          src={
                            require("../../../assets/images/icon-heart-fill.svg")
                              .default
                          }
                          alt="게시글 좋아요"
                        />
                      ) : (
                        <BtnImg
                          src={
                            require("../../../assets/images/icon-heart.svg")
                              .default
                          }
                          alt="게시글 좋아요"
                        />
                      )}
                      {item.heartCount}
                    </BtnLike>
                    <BtnComment
                      onClick={() => {
                        moveDetail(item.id);
                      }}
                    >
                      <BtnImg
                        src={
                          require("../../../assets/images/icon-message-circle-1.svg")
                            .default
                        }
                        alt="게시글 댓글"
                      />
                      {item.comments.length}
                    </BtnComment>
                  </PostBtnBox>
                  <PostDate>{formatDate(item.updatedAt)}</PostDate>
                </PostInfoBox>
              </PostContent>
              <BtnMore onClick={() => modalOpen(item.id)}></BtnMore>
            </Container>
          ))}
    </>
  );
}
