import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CustomButton from "@components/custom/CustomButton";
import { useColors } from "@context/ColorContext";
import ReservationCancelModal from "./ReservationCancelModal";

import PinIcon from "@assets/icons/pin.svg";

const ReservationDetails = ({ state, booking }) => {
  const colors = useColors();
  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  // 가격 계산 함수들
  const calculateRoomPrice = () => booking.one_night_price * booking.night;
  const calculateBreakfastPrice = () => parseInt(booking.breakfast.price.replace(',', '')) * booking.adults;
  const calculateTax = () => Math.floor(calculateRoomPrice() * 0.1); // 10% 세금

  useEffect(() => {
    if (isShowCancelModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isShowCancelModal]);

  return (
    <Wrapper>
      {isShowCancelModal && (
        <ReservationCancelModal setIsShowCancelModal={setIsShowCancelModal} />
      )}

      <TopSection>
        <MainInfo>
          <HotelNameLink to={`/hotel-detail/${encodeURIComponent(booking.name)}`}>
            {booking.name}
          </HotelNameLink>
          <State color={colors.main}>{state}</State>
        </MainInfo>

        <ReservationInfo>
          <InfoBox>
            <ReservationNumber>
              <span>Reservation</span> #{booking.reservation_number}
            </ReservationNumber>
            <RoomDetails>
              {booking.night} Nights, {booking.adults} Adults
              {booking.child > 0 && `, ${booking.child} Child`}, {booking.room_type}
            </RoomDetails>
          </InfoBox>

          <DateInfo>
            <DateBox>
              <Label>Check-in</Label>
              <Date>{booking.check_in}</Date>
            </DateBox>
            <DateBox>
              <Label>Check-out</Label>
              <Date>{booking.check_out}</Date>
            </DateBox>
          </DateInfo>
        </ReservationInfo>
      </TopSection>

      <HotelLacationContainer>
        <ContainerTitle>Location</ContainerTitle>
        <Location>
          <img src={PinIcon} alt="pin-icon" />
          {booking.address}
        </Location>
        <Map>Google Map Coming Soon</Map>
      </HotelLacationContainer>

      <HotelDetailContainer>
        <ContainerTitle>Reservation Details</ContainerTitle>
        <RoomeInfoDetail>
          <DetailInfoBox>
            <DetailInfoName>Room Rate ({booking.night} Nights)</DetailInfoName>
            <DetailInfoContents>
              ₩{calculateRoomPrice().toLocaleString()}
            </DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Breakfast ({booking.adults} persons)</DetailInfoName>
            <DetailInfoContents>
              ₩{calculateBreakfastPrice().toLocaleString()}
            </DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Tax (10%)</DetailInfoName>
            <DetailInfoContents>
              ₩{calculateTax().toLocaleString()}
            </DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Payment Method</DetailInfoName>
            <DetailInfoContents>{booking.payment_method}</DetailInfoContents>
          </DetailInfoBox>
        </RoomeInfoDetail>

        <PriceBox>
          <h4>Total Amount</h4>
          <div>₩
            {(calculateRoomPrice() + calculateBreakfastPrice() + calculateTax()).toLocaleString()}
          </div>
        </PriceBox>
      </HotelDetailContainer>

      <CancellationPolicyContainer>
        <ContainerTitle>Cancellation Policy</ContainerTitle>
        <PolicyContent>
          <p>{booking.cancellationPolicy}</p>
          <p>
            After the free cancellation period, cancellations, modifications, 
            or no-shows will incur a hotel fee equivalent to 100% of the total 
            reservation amount.
          </p>
        </PolicyContent>
      </CancellationPolicyContainer>

      <CustomButton onClick={() => setIsShowCancelModal(true)}>
        Cancel Reservation
      </CustomButton>
    </Wrapper>
  );
};

export default ReservationDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
  background-color: #fff;
`;

const TopSection = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin-bottom: 1.5rem;
`;

const HotelNameLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors?.main || '#0070f3'};
  }
`;

const State = styled.div`
  text-transform: uppercase;
  background-color: ${props => props.color};
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
`;

const ReservationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 0.75rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReservationNumber = styled.div`
  font-size: 0.875rem;
  color: #666;
  
  span {
    color: #999;
  }
`;

const RoomDetails = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const DateInfo = styled.div`
  display: flex;
  gap: 2rem;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 120px;
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const Date = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const HotelInfoContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 1024px) {
    gap: 0.5rem;
  }
`;

const HotelImage = styled.div`
  width: 40%;
  aspect-ratio: 1 / 1;
  background-image: url(${props => props.src});
  background-position: top center;
  background-size: cover;
  border-radius: 0.5rem;
`;

const ContainerTitle = styled.h4`
  padding-bottom: 1rem;
`;

const InfoTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media screen and (max-width: 1024px) {
    gap: 0.5rem;
  }
`;
const RoomInfo = styled.div`
  width: 100%;
  background-color: ${(props) => props.$bgcolor};
  padding: 0.75rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 40px;
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 32px;
    }
  }
`;
const RoomInfoText = styled.div`
  line-height: 2;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.$textcolor};

  span {
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 1280px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const HotelLacationContainer = styled.div``;
const Location = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    width: 24px;
  }

  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 1280px) {
    font-size: 0.9rem;

    img {
      width: 16px;
    }
  }
`;
const Map = styled.div`
  width: 100%;
  height: 400px;
  background-color: #ccc;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 1.2rem;
  font-weight: 500;
`;

const HotelDetailContainer = styled.div``;
const RoomeInfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const DetailInfoBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const DetailInfoName = styled.p`
  font-weight: 600;
  font-size: 1rem;

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
const DetailInfoContents = styled.p`
  font-size: 1.2rem;

  @media screen and (max-width: 1440px) {
    font-size: 1rem;
  }
`;

const PriceBox = styled.div`
  padding: 1rem 0;
  margin-top: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-top: 1px solid #ececec;
  font-weight: 600;
`;

const CancellationPolicyContainer = styled.div``;

const PolicyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;

  @media screen and (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
