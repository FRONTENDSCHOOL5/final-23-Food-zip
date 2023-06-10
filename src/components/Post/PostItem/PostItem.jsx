import React from "react";
import styled from "styled-components";
import UserImg from "../../../assets/images/basic-profile-sm.svg";
import PostTestImg from "../../../assets/images/post-test.jpeg";
import MoreIcon from "../../../assets/images/s-icon-more-vertical.svg";
import BtnHeart from "../../../assets/images/icon-heart.svg";
const Container = styled.section`
  position: relative;
  width: 342px;
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
  margin-top: 17px;
  font-size: 14px;
  line-height: 17px;
`;
const PostImg = styled.img`
  width: 342px;
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
export default function PostItem() {
  return (
    <Container>
      <PostUser>
        <PostUserImg src={UserImg} alt="사용자 이미지" />
        <PostUserBox>
          <PostUserName>애월읍 위니브 감귤농장</PostUserName>
          <PostUserId>@ weniv_Mandarin</PostUserId>
        </PostUserBox>
      </PostUser>
      <PostContent>
        <p>
          옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
          이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게
          뛰노는 인생의 힘있다.
        </p>
        <PostImg src={PostTestImg} alt="포스트 이미지" />
        <PostInfoBox>
          <PostBtnBox>
            <BtnLike>
              <BtnImg
                src={require("../../../assets/icon-heart.svg").default}
                alt="게시글 좋아요"
              />
              58
            </BtnLike>
            <BtnComment>
              <BtnImg
                src={
                  require("../../../assets/icon-message-circle-1.svg").default
                }
                alt="게시글 댓글"
              />
              12
            </BtnComment>
          </PostBtnBox>
          <PostDate>2023년 6월 8일</PostDate>
        </PostInfoBox>
      </PostContent>
      <BtnMore></BtnMore>
    </Container>
  );
}