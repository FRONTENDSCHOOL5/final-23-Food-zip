import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BtnComment,
  BtnLike,
  PostBtnBox,
  PostContent,
  PostDate,
  PostInfoBox,
  PostText,
  PostUser,
  PostUserBox,
  PostUserId,
  PostUserImg,
  PostUserName,
  Container,
  SocialSvg,
  MoreBtn,
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
  const [isHearted, setIsHearted] = useState(infoToIterate.hearted);
  const [heartCnt, setHeartCnt] = useState(infoToIterate.heartCount);

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
      if (isHearted) {
        await postUnlikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt - 1);
      } else {
        await postLikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt + 1);
      }
      if (getUserInfo) {
        getUserInfo();
      }
    } catch (error) {
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

  useEffect(() => {
    if (infoToIterate.hearted !== isHearted) {
      setIsHearted(!isHearted);
      setHeartCnt(infoToIterate.heartCount);
    }
  }, [postInfo]);

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
            <MoreBtn aria-label="더보기 버튼">
              <SocialSVG
                id="icon-more-vertical"
                strokeColor="#c4c4c4"
                margin="0 0 0 0 auto"
                onClick={() => modalOpen(infoToIterate.id)}
              />
            </MoreBtn>
          </PostUser>
        )}
        <PostContent>
          <PostText>{infoToIterate.content}</PostText>
          {infoToIterate.image && infoToIterate.author && (
            <Carousel
              images={infoToIterate.image}
              userInfo={infoToIterate.author.username}
              onImageClick={() => {
                moveDetail(infoToIterate.id);
              }}
            />
          )}
          <PostInfoBox>
            <PostBtnBox>
              <BtnLike onClick={() => postLike(infoToIterate.id)}>
                {isHearted ? (
                  <SocialSVG id="icon-heart" color="red" strokeColor="red" />
                ) : (
                  <SocialSVG id="icon-heart" />
                )}
                {heartCnt}
              </BtnLike>

              <BtnComment
                onClick={() => {
                  moveDetail(infoToIterate.id);
                }}
              >
                <SocialSVG id="icon-message-circle-1" />
                {commentCnt}
              </BtnComment>
            </PostBtnBox>
            <PostDate>{formatDate(infoToIterate.createdAt)}</PostDate>
          </PostInfoBox>
        </PostContent>
      </Container>
    </>
  );
}
