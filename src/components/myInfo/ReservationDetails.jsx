import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "@components/custom/CustomButton";
import { useColors } from "@context/ColorContext";
import ReservationCancelModal from "./ReservationCancelModal";

import HotelImage from "@assets/images/myinfo-hotel-img.jpg";
import PinIcon from "@assets/icons/pin.svg";
import ShelterIcon from "@assets/icons/night-shelter-color.svg";

const hotelInfo = [
  {
    state: "booked",
    name: "Lotte Hotel Seoul",
    reservation_number: 72973820281017,
    night: 2,
    adults: 2,
    child: 0,
    room_name: "standard room",
    check_in: "2025-02-18, 3:00PM",
    check_out: "2025-02-19, 11:00AM",
    address: "30, Eulji-ro, Jung-gu, Seoul",
    one_night_price: 204000,
    tax: 12300,
    payment_method: "Visa Card",
  },
];

const ReservationDetails = ({ state }) => {
  const hotel = {
    ...hotelInfo[0],
    state: state || "booked",
  };

  const colors = useColors();

  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

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

      <HotelName>{hotel.name}</HotelName>

      <HotelInfoContainer>
        <img src={HotelImage} alt="hotel-img" />
        <InfoTextBox>
          <State color={colors.main}>{hotel.state}</State>
          <RoomInfo $bgcolor={colors.subLight}>
            <img src={ShelterIcon} alt="shelter-icon" />
            <RoomInfoText $textcolor={colors.sub}>
              {hotel.night} Nights, {hotel.adults} Adults
              {hotel.child > 0 && `, ${hotel.child} Child`}, {hotel.room_name}
              <br />
              <span>Reservation</span>#{hotel.reservation_number}
            </RoomInfoText>
          </RoomInfo>
          <DateInfo>
            <DateCheckIn>
              <span>Check-in</span>
              <div>Thu,Feb 13,</div>
              <div>2025, 3:00 PM</div>
            </DateCheckIn>
            <DateCheckOut>
              <span>Check-out</span>
              <div>Fri,Feb 14,</div>
              <div>2025, 11:00 AM</div>
            </DateCheckOut>
          </DateInfo>
        </InfoTextBox>
      </HotelInfoContainer>

      <HotelLacationContainer>
        <ContainerTitle>Location</ContainerTitle>
        <Location>
          <img src={PinIcon} alt="pin-icon" />
          {hotel.address}
        </Location>
        <Map />
      </HotelLacationContainer>

      <HotelDetailContainer>
        <ContainerTitle>Reservation Details</ContainerTitle>
        <RoomeInfoDetail>
          <DetailInfoBox>
            <DetailInfoName>Room Type</DetailInfoName>
            <DetailInfoContents>{hotel.room_name}</DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Payment Method</DetailInfoName>
            <DetailInfoContents>{hotel.payment_method}</DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Price per Night</DetailInfoName>
            <DetailInfoContents>
              ₩{hotel.one_night_price.toLocaleString()}
            </DetailInfoContents>
          </DetailInfoBox>

          <DetailInfoBox>
            <DetailInfoName>Tax</DetailInfoName>
            <DetailInfoContents>
              ₩{hotel.tax.toLocaleString()}
            </DetailInfoContents>
          </DetailInfoBox>
        </RoomeInfoDetail>

        <PriceBox>
          <h4>Total Amount</h4>₩
          {(hotel.one_night_price * hotel.night + hotel.tax).toLocaleString()}
        </PriceBox>
      </HotelDetailContainer>

      {/* 임시 취소 정책 */}
      <CancellationPolicyContainer>
        <ContainerTitle>Cancellation Policy</ContainerTitle>
        <PolicyContent>
          <p>Full refund available before December 30 (Mon).</p>
          <p>
            After December 30, 2024, 00:01 (local time of the accommodation),
            cancellations, modifications, or no-shows will incur a hotel fee
            equivalent to 100% of the total reservation amount.
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

  @media screen and (max-width: 1280px) {
    gap: 1.5rem;
  }
`;

const HotelName = styled.h3``;

const HotelInfoContainer = styled.div`
  display: flex;
  gap: 1rem;

  img {
    width: 40%;
  }

  @media screen and (max-width: 1024px) {
    gap: 0.5rem;

    img {
      width: 35%;
    }
  }
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
const State = styled.div`
  text-transform: uppercase;
  background-color: ${(props) => props.color};
  color: #fff;
  font-size: 1rem;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;

  @media screen and (max-width: 1440px) {
    font-size: 0.8rem;
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

const DateInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DateCheckIn = styled.div`
  width: 49%;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;

  span {
    font-size: 1rem;
    color: #999;
  }

  @media screen and (max-width: 1440px) {
    font-size: 1rem;

    span {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 1280px) {
    font-size: 0.9rem;
  }
`;
const DateCheckOut = styled(DateCheckIn)`
  align-items: flex-end;
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
  background-color: #ececec;
  border-radius: 0.5rem;
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
