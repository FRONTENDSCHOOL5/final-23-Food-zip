import styled, { css } from "styled-components";

const InformationTopSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 78px;
`;

const FollowCommonSpan = css`
  font-size: 18px;
  font-weight: 600;
`;

const FollowCommonP = css`
  font-size: 10px;
  margin-top: 6px;
  color: #767676;
`;

const FollowerCntSpan = styled.span`
  ${FollowCommonSpan}
`;

const FollowerCntP = styled.p`
  ${FollowCommonP}
`;

const FollowingCntSpan = styled.span`
  ${FollowCommonSpan}
  color: #767676;
`;

const FollowingCntP = styled.p`
  ${FollowCommonP}
`;

const InformationSection = styled.section`
  text-align: center;
  margin: 16px 0 24px;
`;

const InfoNameP = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const InfoIdP = styled.p`
  font-size: 12px;
  color: #767676;
  margin: 6px 0 16px;
`;

const InfoTextP = styled.p`
  font-size: 14px;
  color: #767676;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  margin: 0 40px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  object-fit: cover;
`;

export {
  InformationTopSection,
  FollowerCntSpan,
  FollowerCntP,
  FollowingCntSpan,
  FollowingCntP,
  InformationSection,
  InfoNameP,
  InfoIdP,
  InfoTextP,
  ProfileImg,
};
