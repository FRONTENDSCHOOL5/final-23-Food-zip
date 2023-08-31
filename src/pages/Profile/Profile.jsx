import React from "react";
import ProfileInformation from "../../components/Profile/ProfileInformation/ProfileInformation";
import PostList from "../../components/Post/PostList/PostList";
import RecommendList from "../../components/Profile/RecommendList/RecommendList";
import Navigation from "../../components/common/Nav/Navigation";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import RecommendCard from "../../components/Modal/RecommendCard/RecommendCard";
import { useRecoilState } from "recoil";
import { cardShowState } from "../../atoms/cardShowAtom";

export default function Profile({ type }) {
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);

  const [cardShow, setCardShow] = useRecoilState(cardShowState);
  function cardClose(e) {
    if (e.target === e.currentTarget) {
      setCardShow(false);
    }
    setCardClosed(true);
  }

  function cardOpen(id) {
    setSelectedId(id);
    setCardShow(true);
  }
  useEffect(() => {
    if (cardClosed) {
      setCardClosed(false);
    }
  }, [cardClosed]);

  return (
    <>
      <Header type="profile" />
      <main>
        <ProfileInformation type={type} />
        <RecommendList cardOpen={cardOpen} cardClosed={cardClosed} />
        <PostList />
        {cardShow && <RecommendCard cardClose={cardClose} id={selectedId} />}
      </main>
      <Navigation />
    </>
  );
}
