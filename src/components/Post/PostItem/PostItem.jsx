import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BtnComment,
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
  SocialSvg,
} from "./PostItemStyle";
import { postLikeApi, postUnlikeApi } from "../../../api/post";
import sprite from "../../../assets/images/SpriteIcon.svg";
import Carousel from "../../common/Carousels/Carousel";
export default function PostItem({
  postInfo,
  modalOpen,
  otherInfo,
  getUserInfo,
  commentCnt,
  fetchPostInfo,
  getFeed,
  // loadFeed,
  skip,
}) {
  const SocialSVG = ({
    id,
    color = "white",
    size = 20,
    strokeColor = "#767676",
    onClick,
    margin = "0",
  }) => (
    <SocialSvg onClick={onClick} style={{ margin: margin }}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} style={{ stroke: "strokeColor" }} />
      </svg>
    </SocialSvg>
  );

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
    const token = localStorage.getItem("token");
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
        getFeed({ token, test: 1 });
        // getFeed({ token, test: 1, skip });
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
            <SocialSVG
              id="icon-more-vertical"
              strokeColor="#c4c4c4"
              margin="0 0 0 0 auto"
              onClick={() => modalOpen(infoToIterate.id)}
            />
          </PostUser>
        )}
        <PostContent>
          <PostText>{infoToIterate.content}</PostText>
          {/* {infoToIterate.image !== "" && (
             <PostImg
               src={infoToIterate.image}
               alt="포스트 이미지"
               onClick={() => {
                 moveDetail(infoToIterate.id);
               }} */}
          {infoToIterate.image && infoToIterate.author && (
            <Carousel
              images={infoToIterate.image}
              userInfo={infoToIterate.author.username}
            />
          )}
          <PostInfoBox>
            <PostBtnBox>
              <BtnLike onClick={() => postLike(infoToIterate.id)}>
                {infoToIterate.hearted ? (
                  <SocialSVG id="icon-heart" color="red" strokeColor="red" />
                ) : (
                  <SocialSVG id="icon-heart" />
                )}
                {infoToIterate.heartCount}
              </BtnLike>

              <BtnComment
                onClick={() => {
                  moveDetail(infoToIterate.id);
                }}
              >
                <SocialSVG id="icon-message-circle-1" />
                {/* {infoToIterate.comments.length} */}
                {commentCnt}
              </BtnComment>
            </PostBtnBox>
            <PostDate>{formatDate(infoToIterate.updatedAt)}</PostDate>
          </PostInfoBox>
        </PostContent>
      </Container>
    </>
  );
}
