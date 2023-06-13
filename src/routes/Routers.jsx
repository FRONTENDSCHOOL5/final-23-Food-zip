import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Splash from "../pages/Splash/Splash";
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/AuthorPage/Login/Login";
import SignUp from "../pages/AuthorPage/SignUp/SignUp";
import ProfileSetting from "../pages/ProfileSetting/ProfileSetting";
import MyProfile from "../pages/Profile/MyProfile/MyProfile";
import ProfileEdit from "../pages/Profile/ProfileEdit/ProfileEdit";
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Splash />} /> */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup">
          <Route index element={<SignUp />} />
          <Route path="profile" element={<ProfileSetting />} />
        </Route>
        <Route path="/profile">
          <Route path="my" element={<MyProfile />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>

        {/* <Route path="profile" element={<ProfileSetting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<ChatDetail />} />
        <Route path="/post">
          <Route path=":id" element={<PostDetail />} />
          <Route path="upload" element={<PostUpload />} />
          <Route path="edit/:id" element={<PostEdit />} />
        </Route>
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/:accountname">
          <Route index element={<Profile />} />
          <Route path="follower" element={<Follower />} />
          <Route path="following" element={<Following />} />
        </Route>
        <Route path="/mypicks" element={<MyPicksUpload />} />
        <Route path="/mypicks/edit" element={<MyPicksEdit />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
