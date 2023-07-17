import styled from "styled-components";

const Container = styled.div`
  width: 358px;
  display: flex;
  align-items: center;
`;
const FollowerImgTest = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;
const FollowerInfo = styled.div`
  padding: 5px 0;
  width: 228px;
`;
const FollowerName = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`;
const FollowerIntro = styled.p`
  font-size: 12px;
  color: #767676;
`;

export {
  Container,
  FollowerImgTest,
  FollowerInfo,
  FollowerName,
  FollowerIntro,
};
