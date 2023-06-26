# 어?금지

## ✨ 어? 금지의 조원 소개

 <table>
   <tr>
     <td align="center">
       <a href="https://github.com/easyxxu">
       <img src="https://avatars.githubusercontent.com/u/107910342?v=4" width="150px;" alt=""/><br />
       <sub>
         <b>이지수</b>
         <br>
         <span>조장</span>
       </sub>
       </a>
       <br>
     </td>
     <td align="center">
       <a href="https://github.com/yyuli">
       <img src="https://avatars.githubusercontent.com/u/119276010?v=4" width="150px;" alt=""/><br />
       <sub>
         <b>김율이</b>
         <br>
         <span>조원</span>
       </sub>
       </a>
       <br>
     </td>
     <td align="center">
       <a href="https://github.com/shyoun94">
       <img src="https://avatars.githubusercontent.com/u/38209666?v=4?s=100" width="150px;" alt=""/><br />
       <sub>
         <b>윤선호</b>
         <br>
         <span>조원</span>
       </sub>
       </a>
       <br>
     </td>
     <td align="center">
       <a href="https://github.com/eunjoo0311">
       <img src="https://avatars.githubusercontent.com/u/120389195?v=4" width="150px;" alt=""/><br />
       <sub>
         <b>이은주</b>
         <br>
         <span>조원</span>
       </sub>
       </a>
       <br>
     </td>
   </tr>
</table>
## 폴더 구조

```
    src
      ├─ App.js
      ├─ assets
      │  └─ images
      │     ├─ arrow.svg
      │     ├─ basic-profile-lg.svg
      │     ├─ basic-profile-sm.svg
      │     ├─ bookmark-solid.svg
      │     ├─ camera-btn.svg
      │     ├─ camera-color.svg
      │     ├─ camera-lg.svg
      │     ├─ camera-sm.svg
      │     ├─ car-solid.svg
      │     ├─ chattest.jpg
      │     ├─ close-btn.svg
      │     ├─ facebook.svg
      │     ├─ fork-profile-lg.svg
      │     ├─ full-logo.svg
      │     ├─ Google.svg
      │     ├─ icon-404.svg
      │     ├─ icon-arrow-left.svg
      │     ├─ icon-edit.svg
      │     ├─ icon-heart-fill.svg
      │     ├─ icon-heart.svg
      │     ├─ icon-home-fill.svg
      │     ├─ icon-home.svg
      │     ├─ icon-image.svg
      │     ├─ icon-img-layers.svg
      │     ├─ icon-message-circle-1.svg
      │     ├─ icon-message-circle-fill.svg
      │     ├─ icon-message-circle.svg
      │     ├─ icon-more-vertical.svg
      │     ├─ icon-post-album-off.svg
      │     ├─ icon-post-album-on.svg
      │     ├─ icon-post-list-off.svg
      │     ├─ icon-post-list-on.svg
      │     ├─ icon-search.svg
      │     ├─ icon-share.svg
      │     ├─ icon-user-fill.svg
      │     ├─ icon-user.svg
      │     ├─ img-bg.svg
      │     ├─ img-button.svg
      │     ├─ kakao.svg
      │     ├─ likelion.svg
      │     ├─ list-example.png
      │     ├─ location-black.svg
      │     ├─ location.svg
      │     ├─ post-test.png
      │     ├─ s-icon-more-vertical.svg
      │     ├─ star.svg
      │     ├─ symbol-logo-gray.svg
      │     ├─ symbol-logo-white.svg
      │     ├─ upload-file.svg
      │     ├─ x-gray.svg
      │     └─ x.svg
      ├─ components
      │  ├─ Auth
      │  │  ├─ LoginForm.jsx
      │  │  └─ SignUpForm.jsx
      │  ├─ Chat
      │  │  ├─ ChatListItem.jsx
      │  │  ├─ ReceiveMessage.jsx
      │  │  └─ SendMessage.jsx
      │  ├─ Comment
      │  │  └─ Comment.jsx
      │  ├─ common
      │  │  ├─ Button
      │  │  │  └─ Button.jsx
      │  │  ├─ Header
      │  │  │  └─ Header.jsx
      │  │  └─ Nav
      │  │     ├─ ChatNavigation.jsx
      │  │     └─ Navigation.jsx
      │  ├─ Error
      │  │  └─ Error.jsx
      │  ├─ Feed
      │  │  ├─ EmptyHome.jsx
      │  │  └─ PostHome.jsx
      │  ├─ FollowItem
      │  │  └─ FollowItem.jsx
      │  ├─ Modal
      │  │  ├─ Alert.jsx
      │  │  ├─ Modal.jsx
      │  │  └─ RecommendCard.jsx
      │  ├─ Post
      │  │  ├─ ImgPrev
      │  │  │  ├─ PostImgPrev.jsx
      │  │  │  └─ RecommendImgPrev.jsx
      │  │  ├─ PostEdit
      │  │  │  ├─ PostEdit.jsx
      │  │  │  └─ RecommendEdit.jsx
      │  │  ├─ PostItem
      │  │  │  └─ PostItem.jsx
      │  │  ├─ PostList
      │  │  │  └─ PostList.jsx
      │  │  └─ StarRating
      │  │     └─ StarRating.jsx
      │  ├─ Profile
      │  │  ├─ ProfileBtn.jsx
      │  │  ├─ ProfileForm
      │  │  │  └─ ProfileForm.jsx
      │  │  ├─ ProfileInformation.jsx
      │  │  └─ RecommendList.jsx
      │  ├─ Search
      │  │  └─ SearchList.jsx
      │  └─ styles
      │     └─ Globalstyle.jsx
      ├─ dummy
      │  └─ dummyapi.js
      ├─ index.js
      ├─ pages
      │  ├─ AuthorPage
      │  │  ├─ Login
      │  │  │  └─ Login.jsx
      │  │  └─ SignUp
      │  │     └─ SignUp.jsx
      │  ├─ Chat
      │  │  ├─ ChatList.jsx
      │  │  └─ ChatRoom.jsx
      │  ├─ Error
      │  │  └─ ErrorPage.jsx
      │  ├─ FollowerList
      │  │  └─ FollowerList.jsx
      │  ├─ Home
      │  │  └─ Home.jsx
      │  ├─ Loading
      │  │  └─ Loading.jsx
      │  ├─ Map
      │  │  ├─ Map.jsx
      │  │  └─ MapStyle.css
      │  ├─ Post
      │  │  ├─ DetailPost.jsx
      │  │  ├─ MakePost.jsx
      │  │  └─ MakeRecommend.jsx
      │  ├─ Profile
      │  │  ├─ Profile.jsx
      │  │  └─ ProfileEdit
      │  │     └─ ProfileEdit.jsx
      │  ├─ ProfileSetting
      │  │  └─ ProfileSetting.jsx
      │  ├─ Search
      │  │  └─ Search.jsx
      │  ├─ Splash
      │  │  └─ Splash.jsx
      │  └─ Welcome
      │     └─ Welcome.jsx
      └─ routes
         └─ Routers.jsx

```
