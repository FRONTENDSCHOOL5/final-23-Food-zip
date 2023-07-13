import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 12px;
  background: #fff;
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const SubText = styled.p`
  font-size: 14px;
  color: #767676;
`;

export { Container, Title, SubText };
