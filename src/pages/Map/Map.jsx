import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import arrow from "../../assets/images/arrow.svg";
import Car from "../../assets/images/car-solid.svg";
import BookMark from "../../assets/images/bookmark-solid.svg";
import Marker from "../../assets/images/location.svg";
import { useLocation } from "react-router-dom";
import "./MapStyle.css";
import Modal from "../../components/Modal/Modal";
import Alert from "../../components/Modal/Alert";
const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: inline-block;
  padding: 48px 0 157px 0;
  box-sizing: border-box;
  position: relative;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.div`
  padding: 20px;
  border-top: 1px solid #ebebeb;
`;

const ResName = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin: 0 5px 8px 0px;
  display: inline-block;
`;

const Address = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 18px;
`;

const BtnList = styled.ul`
  width: 354px;
  height: 40px;
  display: flex;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  margin: 0 auto;
`;

const MapLi = styled.li`
  border-right: 1px solid #ebebeb;
  flex-grow: 1;
  flex-basis: 33%;
  &:last-child {
    border-right: none;
  }
`;

const MapBtn = styled.button`
  width: 100%;
  display: block;
  height: 100%;
`;

const MapImg = styled.img`
  margin: auto;
  display: block;
`;
const { kakao } = window;

const MapTest = () => {
  const [place, setPlace] = useState("");
  const [map, setMap] = useState(null);
  const location = useLocation();
  const data = location.state;
  const recommendName = data.restaurantname;

  useEffect(() => {
    let container = document.getElementById("map");
    let options = { center: new kakao.maps.LatLng(37.5045, 127.049) };
    let kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  useEffect(() => {
    if (map && recommendName) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(recommendName, placesSearchCB);

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      }

      function displayMarker(place) {
        const imageSize = new kakao.maps.Size(45, 45);
        const imageSrc = Marker;
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });
        let content =
          '<div class="customoverlay">' +
          '<a href="https://map.kakao.com/link/search/' +
          encodeURIComponent(place.place_name) +
          "?itemId=" +
          place.itemId +
          '" target="_blank">' +
          '<span class="title">' +
          place.place_name +
          "</span>" +
          "</a></div>";
        setPlace(place.road_address_name);
        let customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(place.y, place.x),
          content: content,
          yAnchor: 1,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setMap(map);
        });
      }
    }
  }, [recommendName, map]);

  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("setting");

  function modalClose(e) {
    if (e.target === e.currentTarget) {
      setModalShow(false);
    }
  }

  function modalOpen(type) {
    setModalShow(true);
    setModalType(type);
  }

  const [alertShow, setAlertShow] = useState(false);
  function alertClose(e) {
    if (e.target === e.currentTarget) {
      setAlertShow(false);
    }
  }

  function alertOpen() {
    setAlertShow(true);
  }

  return (
    <>
      <Header type="map" modalOpen={() => modalOpen("setting")} />
      <MapWrapper>
        <Map id="map"></Map>
        <InfoWrapper>
          <ResName>{recommendName}</ResName>
          {/* <FoodType>돈까스 우동</FoodType> */}
          <Address>{place}</Address>
          <BtnList>
            <MapLi>
              <MapBtn>
                <MapImg src={arrow} alt="화살표" />
              </MapBtn>
            </MapLi>
            <MapLi>
              <MapBtn>
                <MapImg src={Car} alt="자동차" />
              </MapBtn>
            </MapLi>
            <MapLi>
              <MapBtn>
                <MapImg src={BookMark} alt="북마크" />
              </MapBtn>
            </MapLi>
          </BtnList>
        </InfoWrapper>
      </MapWrapper>
      {modalShow && (
        <Modal type={modalType} modalClose={modalClose} alertOpen={alertOpen} />
      )}
      {alertShow && <Alert type="logout" alertClose={alertClose} />}
    </>
  );
};

export default MapTest;
