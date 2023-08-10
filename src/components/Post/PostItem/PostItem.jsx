import React from "react";
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
import Carousel from "../../common/Carousels/Carousel";
export default function PostItem({
  postInfo,
  modalOpen,
  otherInfo,
  getUserInfo,
  commentCnt,
  getOtherInfo,
  fetchPostInfo,
}) {
  const infoToIterate = postInfo || otherInfo;
  const navigate = useNavigate();
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
      if (getUserInfo) getUserInfo();
      if (fetchPostInfo) fetchPostInfo();
      if (getOtherInfo) getOtherInfo();
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
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BtnMore,
//   BtnComment,
//   BtnImg,
//   BtnLike,
//   PostBtnBox,
//   PostContent,
//   PostDate,
//   PostImg,
//   PostInfoBox,
//   PostText,
//   PostUser,
//   PostUserBox,
//   PostUserId,
//   PostUserImg,
//   PostUserName,
//   Container,
// } from "./PostItemStyle";
// import { postInfoApi, postLikeApi, postUnlikeApi } from "../../../api/post";
// export default function PostItem({
//   postInfo,
//   modalOpen,
//   otherInfo,
//   getUserInfo,
//   commentCnt,
//   fetchPostInfo,
//   setMyPostInfo,
// }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [infoToIterate, setInfoToIterate] = useState(postInfo || otherInfo);
//   // const infoToIterate = postInfo || otherInfo;
//   const [hearted, setHearted] = useState(infoToIterate.hearted);
//   const [heartCnt, setHeartCnt] = useState(infoToIterate.heartCount);
//   function moveDetail(id) {
//     navigate("/detailpost", {
//       state: {
//         id: id,
//         infoToIterate: infoToIterate,
//       },
//     });
//   }
//   const postLike = async () => {
//     console.log("detailpost");
//     try {
//       if (hearted) {
//         await postUnlikeApi(infoToIterate.id, token);
//         setHearted(!hearted);
//         setHeartCnt(heartCnt - 1);
//       } else {
//         await postLikeApi(infoToIterate.id, token);
//         setHearted(!hearted);
//         setHeartCnt(heartCnt + 1);
//       }
//       const post = await loadPostInfo();
//       setInfoToIterate(post);
//       // console.log(infoToIterate);
//       if (getUserInfo) {
//         getUserInfo();
//       }
//       if (fetchPostInfo) {
//         console.log("fetchPostInfo  ㄱㄱ");
//         fetchPostInfo();
//       }
//       // setMyPostInfo(post);
//       // if (getFeed) {
//       //   console.log("getFeed  ㄱㄱ");
//       //   getFeed({ token });
//       //   console.log("infoToIterate: ", infoToIterate.hearted);
//       // }
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   };
//   // console.log(infoToIterate);
//   const loadPostInfo = async () => {
//     try {
//       const res = await postInfoApi(infoToIterate.id, token);
//       return res.data.post;
//     } catch (error) {
//       navigate("/error");
//     }
//   };
//   function moveProfile(accountname) {
//     const where = localStorage.getItem("accountname");
//     if (accountname === where) {
//       navigate("/myprofile", {
//         state: {
//           accountname: accountname,
//         },
//       });
//     } else {
//       navigate(`/profile/${accountname}`, {
//         state: {
//           accountname: accountname,
//         },
//       });
//     }
//   }
//   function formatDate(dateString) {
//     const dateObj = new Date(dateString);
//     const year = dateObj.getFullYear();
//     const month = dateObj.getMonth() + 1;
//     const day = dateObj.getDate();
//     return `${year}년 ${month}월 ${day}일`;
//   }
//   // console.log("1. ", infoToIterate.hearted);
//   console.log("2. ", hearted);
//   return (
//     <>
//       <Container>
//         {infoToIterate && infoToIterate.author && (
//           <PostUser>
//             <PostUserImg
//               src={infoToIterate.author.image}
//               alt="사용자 이미지"
//               onClick={() => moveProfile(infoToIterate.author.accountname)}
//             />
//             <PostUserBox
//               onClick={() => moveProfile(infoToIterate.author.accountname)}
//             >
//               <PostUserName>{infoToIterate.author.username}</PostUserName>
//               <PostUserId>@ {infoToIterate.author.accountname}</PostUserId>
//             </PostUserBox>
//           </PostUser>
//         )}
//         <PostContent>
//           <PostText>{infoToIterate.content}</PostText>
//           {infoToIterate.image !== "" && (
//             <PostImg src={infoToIterate.image} alt="포스트 이미지" />
//           )}
//           <PostInfoBox>
//             <PostBtnBox>
//               <BtnLike onClick={() => postLike(infoToIterate.id)}>
//                 {hearted ? (
//                   <BtnImg
//                     src={
//                       require("../../../assets/images/icon-heart-fill.svg")
//                         .default
//                     }
//                     alt="게시글 좋아요"
//                   />
//                 ) : (
//                   <BtnImg
//                     src={
//                       require("../../../assets/images/icon-heart.svg").default
//                     }
//                     alt="게시글 좋아요"
//                   />
//                 )}
//                 {heartCnt}
//               </BtnLike>
//               <BtnComment
//                 onClick={() => {
//                   moveDetail(infoToIterate.id);
//                 }}
//               >
//                 <BtnImg
//                   src={
//                     require("../../../assets/images/icon-message-circle-1.svg")
//                       .default
//                   }
//                   alt="게시글 댓글"
//                 />
//                 {commentCnt || infoToIterate.comments.length}
//               </BtnComment>
//             </PostBtnBox>
//             <PostDate>{formatDate(infoToIterate.updatedAt)}</PostDate>
//           </PostInfoBox>
//         </PostContent>
//         <BtnMore onClick={() => modalOpen(infoToIterate.id)}></BtnMore>
//       </Container>
//     </>
//   );
// }
