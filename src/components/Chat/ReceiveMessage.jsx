import styled from "styled-components";
import foodzim from "../../assets/images/basic-profile-lg.svg";

const MessageWrap = styled.li`
  list-style: none;
  display: flex;
  padding: 8px 16px;
  gap: 9px;
  align-items: flex-start;
`;

const ProfileImg = styled.img`
  width: 42px;
  border-radius: 50%;
`;

const MessageText = styled.div`
  max-width: 240px;
  padding: 12px;
  border: 1px solid #c4c4c4;
  border-radius: 0 10px 10px 10px;
  font-size: 14px;
  position: relative;
`;

const TimeStamp = styled.span`
  font-size: 10px;
  color: #767676;
  position: absolute;
  bottom: 0px;
  right: -35px;
`;

export default function ReceiveMessage() {
  return (
    <MessageWrap>
      <ProfileImg src={foodzim} alt="사용자 프로필 사진" />
      <MessageText>
        옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
        이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게
        뛰노는 인생의 힘있다.
        <TimeStamp>12:39</TimeStamp>
      </MessageText>
    </MessageWrap>
  );
}
