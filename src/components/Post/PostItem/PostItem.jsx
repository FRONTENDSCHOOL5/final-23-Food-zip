import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BtnMore,
  BtnComment,
  BtnImg,
  BtnLike,
  PostBtnBox,
  PostContent,
  PostDate,
  PostImg,
  PostInfoBox,
  PostText,
  PostUser,
  PostUserBox,
  PostUserId,
  PostUserImg,
  PostUserName,
  Container,
} from "./PostItemStyle";
import { postLikeApi, postUnlikeApi } from "../../../api/post";
export default function PostItem({
  postInfo,
  modalOpen,
  otherInfo,
  getUserInfo,
  commentCnt,
  fetchPostInfo,
  getFeed,
}) {
  const infoToIterate = postInfo || otherInfo;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function moveDetail(id) {
    navigate("/detailpost", {
      state: {
        id: id,
        infoToIterate: infoToIterate,
      },
    });
  }
  const postLike = async () => {
    console.log("check");
    try {
      if (infoToIterate.hearted) {
        await postUnlikeApi(infoToIterate.id, token);
      } else {
        await postLikeApi(infoToIterate.id, token);
      }
      if (getUserInfo) {
        console.log("getUserInfo실행됨");
        getUserInfo();
      }
      if (fetchPostInfo) {
        console.log("fetchPostInfo  ㄱㄱ");
        // fetchPostInfo();
      }
      if (getFeed) {
        console.log("getFeed  ㄱㄱ");
        getFeed({ token });
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  function moveProfile(accountname) {
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

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
  return (
    <>
      <Container>
        {infoToIterate && infoToIterate.author && (
          <PostUser>
            <PostUserImg
              src={infoToIterate.author.image}
              alt="사용자 이미지"
              onClick={() => moveProfile(infoToIterate.author.accountname)}
            />
            <PostUserBox
              onClick={() => moveProfile(infoToIterate.author.accountname)}
            >
              <PostUserName>{infoToIterate.author.username}</PostUserName>
              <PostUserId>@ {infoToIterate.author.accountname}</PostUserId>
            </PostUserBox>
          </PostUser>
        )}
        <PostContent>
          <PostText>{infoToIterate.content}</PostText>
          {infoToIterate.image !== "" && (
            <PostImg src={infoToIterate.image} alt="포스트 이미지" />
          )}
          <PostInfoBox>
            <PostBtnBox>
              <BtnLike onClick={() => postLike(infoToIterate.id)}>
                {infoToIterate.hearted ? (
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
                      require("../../../assets/images/icon-heart.svg").default
                    }
                    alt="게시글 좋아요"
                  />
                )}
                {infoToIterate.heartCount}
              </BtnLike>
              <BtnComment
                onClick={() => {
                  moveDetail(infoToIterate.id);
                }}
              >
                <BtnImg
                  src={
                    require("../../../assets/images/icon-message-circle-1.svg")
                      .default
                  }
                  alt="게시글 댓글"
                />
                {commentCnt || infoToIterate.comments.length}
              </BtnComment>
            </PostBtnBox>
            <PostDate>{formatDate(infoToIterate.updatedAt)}</PostDate>
          </PostInfoBox>
        </PostContent>
        <BtnMore onClick={() => modalOpen(infoToIterate.id)}></BtnMore>
      </Container>
    </>
  );
}
