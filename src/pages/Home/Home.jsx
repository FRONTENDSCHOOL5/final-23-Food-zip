import React from "react";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import PostHome from "../../components/Feed/PostHome";

export default function Home() {
  return (
    <>
      <Header type="home" />
      <PostHome />
      <Navigation />
    </>
  );
}
