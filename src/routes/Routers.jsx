import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "../pages/Splash/Splash";
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/AuthorPage/Login/Login";
import SignUp from "../pages/AuthorPage/SignUp/SignUp";
import ProfileSetting from "../pages/ProfileSetting/ProfileSetting";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import ChatList from "../pages/Chat/ChatList";
import ErrorPage from "../pages/Error/ErrorPage";
import ChatRoom from "../pages/Chat/ChatRoom";
import MakePost from "../pages/Post/MakePost";
import Profile from "../pages/Profile/Profile";
import ProfileEdit from "../pages/Profile/ProfileEdit/ProfileEdit";
import DetailPost from "../pages/Post/DetailPost";
import FollowerList from "../pages/FollowerList/FollowerList";
import MakeRecommend from "../pages/Post/MakeRecommend";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup">
          <Route index element={<SignUp />} />
          <Route path="profile" element={<ProfileSetting />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/makepost" element={<MakePost />} />
        <Route path="/myprofile">
          <Route index element={<Profile type="my" />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>
        <Route path="/profile/:accountname">
          <Route index element={<Profile type="your" />} />
        </Route>
        <Route
          path="/followerlist"
          element={<FollowerList type="followers" followType="followerList" />}
        />
        <Route
          path="/followinglist"
          element={
            <FollowerList type="followings" followType="followingList" />
          }
        />
        <Route path="/detailpost" element={<DetailPost />} />
        <Route path="/makerecommend" element={<MakeRecommend />} />
      </Routes>
    </BrowserRouter>
  );
}
