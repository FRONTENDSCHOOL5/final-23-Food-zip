import styled from "styled-components";

const EmptyWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const EmptyImg = styled.img`
  margin: -70px 0 12px 0;
`;
const EmptyText = styled.h2`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;

export { EmptyWrapper, EmptyImg, EmptyText };
