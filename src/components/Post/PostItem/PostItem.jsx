import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserImg from "../../../assets/images/basic-profile-sm.svg";
import PostTestImg from "../../../assets/images/post-test.png";
import MoreIcon from "../../../assets/images/s-icon-more-vertical.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.section`
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
export default function PostItem({ modalOpen }) {
  const navigate = useNavigate();
  function moveDetail() {
    navigate("/detailpost");
  }
  const [postInfo, setPostInfo] = useState({
    postimage: "",
    content: "",
    updatedAt: "",
  });
  const [userInfo, setUserInfo] = useState({
    image: "",
    accountname: "",
    username: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const accountname = localStorage.getItem("accountname");
    console.log(token);
    const res = await axios.get(
      `https://api.mandarin.weniv.co.kr/post/${accountname}/userpost`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );
    console.log(res.data);
    // const { username, image } = res.data.post.author;
    // setUserInfo({
    //   username,
    //   image,
    // });
    const { image, content, updatedAt } = res.data.post[0];
    setPostInfo({
      image,
      content,
      updatedAt,
    });
  };
  console.log(postInfo);

  return (
    <Container>
      <PostUser>
        <PostUserImg src={userInfo.followerCount} alt="사용자 이미지" />
        <PostUserBox>
          <PostUserName>{userInfo.username}</PostUserName>
          <PostUserId>@ {userInfo.accountname}</PostUserId>
        </PostUserBox>
      </PostUser>
      <PostContent>
        <p>{postInfo.content}</p>
        <PostImg src={postInfo.postimage} alt="포스트 이미지" />
        <PostInfoBox>
          <PostBtnBox>
            <BtnLike>
              <BtnImg
                src={require("../../../assets/images/icon-heart.svg").default}
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
          <PostDate>{postInfo.updatedAt}</PostDate>
        </PostInfoBox>
      </PostContent>
      <BtnMore onClick={modalOpen}></BtnMore>
    </Container>
  );
}
