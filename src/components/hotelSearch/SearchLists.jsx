import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CustomMainInput from "@components/custom/CustomMainInput";
import { useColors } from "@context/ColorContext";

import StarFillIcon from "@assets/icons/star-fill.svg";

const hotelLists = [
  {
    name: "Lotte Hotel Seoul",
    place: "Seoul",
    room_type_01: "Superior Twin",
    room_type_02: "Superior Double",
    room_type_01_price: "169,000",
    room_type_02_price: "204,000",
    stars: 5,
    rating: 4.8,
    reviews: 1250,
  },
  {
    name: "Lotte Hotel Busan",
    place: "Busan",
    room_type_01: "Superior Twin",
    room_type_02: "Superior Double",
    room_type_01_price: "169,000",
    room_type_02_price: "204,000",
    stars: 5,
    rating: 4.6,
    reviews: 980,
  },
  {
    name: "Best Western Gangnam",
    place: "Seoul",
    room_type_01: "Superior Twin",
    room_type_02: "Superior Double",
    room_type_01_price: "169,000",
    room_type_02_price: "204,000",
    stars: 4,
    rating: 4.3,
    reviews: 756,
  },
  {
    name: "Best Western Cheongdam",
    place: "Seoul",
    room_type_01: "Superior Twin",
    room_type_02: "Superior Double",
    room_type_01_price: "169,000",
    room_type_02_price: "204,000",
    stars: 4,
    rating: 4.2,
    reviews: 632,
  },
  {
    name: "Best Western Incheon",
    place: "Incheon",
    room_type_01: "Superior Twin",
    room_type_02: "Superior Double",
    room_type_01_price: "169,000",
    room_type_02_price: "204,000",
    stars: 3,
    rating: 4.0,
    reviews: 489,
  },
];

const SearchLists = () => {
  const colors = useColors();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("search") || "";
  const selectedArea = queryParams.get("area") || "Seoul";

  const filteredHotels = hotelLists.filter((hotel) => {
    // 검색어와 지역 모두 있는 경우
    if (searchKeyword && selectedArea) {
      return (
        hotel.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        hotel.place === selectedArea
      );
    }
    // 검색어만 있는 경우
    if (searchKeyword) {
      return hotel.name.toLowerCase().includes(searchKeyword.toLowerCase());
    }
    // 지역만 있는 경우
    if (selectedArea) {
      return hotel.place === selectedArea;
    }
    // 둘 다 없는 경우 모든 호텔 표시
    return true;
  });

  return (
    <Wrapper>
      <CustomMainInput />
      <ListsBox>
        <Lists>
          {filteredHotels.map((list) => (
            <Link to={`/hotel-detail/${list.name}`} key={list.name}>
              <List color={colors.mainLight}>
                <InfoBox>
                  <TitleBox>
                    <Title color={colors.sub}>
                      {list.name}
                      <span>{list.stars}-Star</span>
                    </Title>
                    <TitleInfo>
                      <Place>{list.place},</Place>
                      <ReviewRating>
                        <img src={StarFillIcon} alt="star-fill-icon" />
                        {list.rating}({list.reviews})
                      </ReviewRating>
                    </TitleInfo>
                  </TitleBox>

                  <PriceWrapper>
                    <PriceBox>
                      <RoomTypeName>{list.room_type_01} Room</RoomTypeName>
                      <Price>₩ {list.room_type_01_price}</Price>
                    </PriceBox>
                    <PriceBox>
                      <RoomTypeName>{list.room_type_02} Room</RoomTypeName>
                      <Price>₩ {list.room_type_02_price}</Price>
                    </PriceBox>
                  </PriceWrapper>
                </InfoBox>
              </List>
            </Link>
          ))}
        </Lists>
      </ListsBox>
    </Wrapper>
  );
};

export default SearchLists;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 1280px) {
    width: 68%;
  }
`;

const ListsBox = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-right: 1rem;

  @media screen and (max-width: 1280px) {
    padding-right: 0.5rem;
  }
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const List = styled.li`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  border: 2px solid #ececec;
  border-radius: 1rem;

  &:hover {
    border-color: ${(props) => props.color};
  }

  @media screen and (max-width: 1280px) {
    padding: 1rem;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleBox = styled.div``;
const Title = styled.h3`
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: ${(props) => props.color};
  }
`;
const TitleInfo = styled.div`
  padding-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Place = styled.p`
  font-size: 1rem;
  color: #666;
`;
const ReviewRating = styled.p`
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  img {
    width: 20px;
    display: inline-block;
  }
`;

const PriceWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;
const PriceBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const RoomTypeName = styled.p`
  color: #666;
`;
const Price = styled.h3``;
