import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header/Header";
import arrow from "../../assets/images/arrow.svg";
import Car from "../../assets/images/car-solid.svg";
import BookMark from "../../assets/images/bookmark-solid.svg";
import Marker from "../../assets/images/location.svg";
import MarkerBlack from "../../assets/images/location-black.svg";
import { useLocation, useNavigate } from "react-router-dom";

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
  height: 610px;
`;

const InfoWrapper = styled.div`
  padding: 20px;
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
const NowLoactionBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 68px;
  z-index: 100;
  width: 30px;
  height: 30px;
  border: 2px solid #606367;
  background: #fff;
`;
const NowLoaction = styled.img`
  width: 50%;
`;
const { kakao } = window;

const MapTest = () => {
  const [place, setPlace] = useState("");
  const [map, setMap] = useState(null);
  const [nowLocation, setNowLocation] = useState("");
  const location = useLocation();
  const data = location.state;
  console.log("map-data", data);
  const recommendName = data.restaurantname;
  console.log("map-data", recommendName);
  useEffect(() => {
    let container = document.getElementById("map");
    let options = { center: new kakao.maps.LatLng(37.5045, 127.049) };
    let kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  function findLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), //
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; //
        console.log("now", locPosition);
        displayMarker2(locPosition);
      });
    }
  }
  function displayMarker2(place) {
    const imageSize = new kakao.maps.Size(45, 45);
    const imageSrc = MarkerBlack;
    // const imageOption = { offset: new kakao.maps.Point(27, 69) };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    let marker = new kakao.maps.Marker({
      map: map,
      position: place,
      image: markerImage,
    });
    setPlace(place.road_address_name);
    let iwContent = "현위치";
    // 인포윈도우에 표시할 내용
    let iwRemoveable = true;
    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });
    infowindow.open(map, marker);
    map.setCenter(place);
  }

  useEffect(() => {
    if (map && recommendName) {
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

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
        // const imageOption = { offset: new kakao.maps.Point(27, 69) };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });
        console.log("location:", place.place_name, place.road_address_name);
        setPlace(place.road_address_name);
        // 마커에 클릭 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>",
          );

          infowindow.open(map, marker);
        });
      }
    }
  }, [recommendName, map]);

  return (
    <>
      <Header type="map" />
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
        <NowLoactionBtn onClick={findLocation}>
          <NowLoaction src={MarkerBlack} alt="현재 위치 마크" />
        </NowLoactionBtn>
      </MapWrapper>
    </>
  );
};

export default MapTest;
