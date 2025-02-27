import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

// 스타일드 컴포넌트 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContainer = styled.div`
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`;

const SubSectionTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 10px;
`;

const ImageUploadBox = styled.div`
  min-width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AddImageButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const PlusIcon = styled.span`
  font-size: 24px;
  color: ${props => props.colors.main};
  margin-bottom: 4px;
`;

const AddText = styled.span`
  font-size: 12px;
  color: ${props => props.colors.main};
`;

const CountText = styled.span`
  font-size: 10px;
  color: #888;
  margin-top: 4px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const AddressContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const AddressSearchButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 16px;
  white-space: nowrap;
  cursor: pointer;
`;

const NoteText = styled.p`
  font-size: 12px;
  color: #888;
  margin: 4px 0 12px;
`;

const AmenitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const AmenityInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const CheckTimesContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CheckTime = styled.div`
  flex: 1;
`;

const CheckTimeLabel = styled.label`
  font-weight: normal;
  font-size: 14px;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.colors.main};
  cursor: pointer;
  font-size: 14px;
`;

const CircleIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.colors.main};
  color: white;
  margin-right: 6px;
  font-size: 16px;
`;

const RoomContent = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
`;

const RoomTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;

const RoomTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

const DeleteRoomButton = styled.button`
  background-color: #ffe5e5;
  color: #ff3b30;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

const GuestCountContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
`;

const RegisterButton = styled.button`
  background-color: ${props => props.colors.main};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 36px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${props => props.colors.main}cc;
  }
`;

const HotelRegistrationModal = ({ onClose }) => {
  const colors = useColors();
  const [hotelImages, setHotelImages] = useState([null]);
  const [roomImages, setRoomImages] = useState([null]);
  const [showBreakfastPrice, setShowBreakfastPrice] = useState(false);
  const [amenities, setAmenities] = useState({
    amenity1: "",
    amenity2: "",
    amenity3: "",
    amenity4: "",
    amenity5: "",
    amenity6: "",
  });

  const handleHotelImageUpload = (index) => {
    // Image upload logic would go here
    console.log("Upload hotel image at index:", index);
  };

  const handleRoomImageUpload = (index) => {
    // Image upload logic would go here
    console.log("Upload room image at index:", index);
  };

  const handleBreakfastOptionChange = (e) => {
    setShowBreakfastPrice(e.target.value === "available");
  };

  const handleDeleteRoom = () => {
    // Room deletion logic would go here
    console.log("Delete room");
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>호텔등록</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalContent>
          <Section>
            <SectionTitle>호텔이미지 등록</SectionTitle>
            <ImageUploadContainer>
              {hotelImages.map((image, index) => (
                <ImageUploadBox key={`hotel-image-${index}`}>
                  {image ? (
                    <Image src={image} alt={`Hotel ${index + 1}`} />
                  ) : (
                    <AddImageButton
                      onClick={() => handleHotelImageUpload(index)}
                    >
                      <PlusIcon colors={colors}>+</PlusIcon>
                      <AddText colors={colors}>사진추가</AddText>
                    </AddImageButton>
                  )}
                </ImageUploadBox>
              ))}
            </ImageUploadContainer>
          </Section>

          <Section>
            <FormGroup>
              <Label>호텔명</Label>
              <Input type="text" placeholder="서울신라호텔" />
            </FormGroup>

            <FormGroup>
              <Label>호텔주소</Label>
              <AddressContainer>
                <Input type="text" placeholder="서울특별시 영등포구 여의도동" />
                <AddressSearchButton>주소검색</AddressSearchButton>
              </AddressContainer>
              <Input
                type="text"
                placeholder="123-2 8동"
                style={{ marginTop: "8px" }}
              />
              <Input
                type="text"
                placeholder="96345"
                style={{ marginTop: "8px" }}
              />
            </FormGroup>

            <FormGroup>
              <Label>호텔 연락처</Label>
              <Input type="text" placeholder="02-2292-2222" />
            </FormGroup>

            <FormGroup>
              <Label>대여선택</Label>
              <Select>
                <option value="">카지노</option>
                <option value="hotel">호텔</option>
                <option value="resort">리조트</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>주요 편의 시설/ 서비스</Label>
              <NoteText>
                * 주요 편의시설 / 서비스는 온종일세레니아에 노출됩니다.
              </NoteText>
              <AmenitiesContainer>
                <AmenityInput
                  placeholder="편의시설 1"
                  value={amenities.amenity1}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity1: e.target.value })
                  }
                />
                <AmenityInput
                  placeholder="편의시설 2"
                  value={amenities.amenity2}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity2: e.target.value })
                  }
                />
                <AmenityInput
                  placeholder="편의시설 3"
                  value={amenities.amenity3}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity3: e.target.value })
                  }
                />
                <AmenityInput
                  placeholder="편의시설 4"
                  value={amenities.amenity4}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity4: e.target.value })
                  }
                />
                <AmenityInput
                  placeholder="편의시설 5"
                  value={amenities.amenity5}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity5: e.target.value })
                  }
                />
                <AmenityInput
                  placeholder="편의시설 6"
                  value={amenities.amenity6}
                  onChange={(e) =>
                    setAmenities({ ...amenities, amenity6: e.target.value })
                  }
                />
              </AmenitiesContainer>
            </FormGroup>

            <FormGroup>
              <Label>체크인/ 체크아웃 시간 설정</Label>
              <CheckTimesContainer>
                <CheckTime>
                  <CheckTimeLabel>체크인</CheckTimeLabel>
                  <Input type="text" placeholder="오후 15:00" />
                </CheckTime>
                <CheckTime>
                  <CheckTimeLabel>체크아웃</CheckTimeLabel>
                  <Input type="text" placeholder="오전 10:00" />
                </CheckTime>
              </CheckTimesContainer>
            </FormGroup>

            <FormGroup>
              <Label>조식 옵션 선택</Label>
              <Select
                onChange={handleBreakfastOptionChange}
                defaultValue="unavailable"
              >
                <option value="unavailable">조식 이용 불가</option>
                <option value="available">조식 이용 가능</option>
              </Select>
              {showBreakfastPrice && (
                <Input
                  type="text"
                  placeholder="조식 이용 금액"
                  style={{ marginTop: "8px" }}
                />
              )}
            </FormGroup>
          </Section>

          <Section>
            <RoomHeader>
              <SectionTitle>객실등록</SectionTitle>
              <AddButton colors={colors}>
                <CircleIcon colors={colors}>+</CircleIcon> 객실 추가
              </AddButton>
            </RoomHeader>

            <RoomContent>
              <RoomTitleContainer>
                <RoomTitle>객실 1</RoomTitle>
                <DeleteRoomButton onClick={handleDeleteRoom}>
                  객실 삭제
                </DeleteRoomButton>
              </RoomTitleContainer>

              <Section>
                <SubSectionTitle>객실 이미지 등록</SubSectionTitle>
                <ImageUploadContainer>
                  {roomImages.map((image, index) => (
                    <ImageUploadBox key={`room-image-${index}`}>
                      {image ? (
                        <Image src={image} alt={`Room ${index + 1}`} />
                      ) : (
                        <AddImageButton
                          onClick={() => handleRoomImageUpload(index)}
                        >
                          <PlusIcon colors={colors}>+</PlusIcon>
                          <AddText colors={colors}>사진추가</AddText>
                        </AddImageButton>
                      )}
                    </ImageUploadBox>
                  ))}
                </ImageUploadContainer>
              </Section>

              <FormGroup>
                <Label>객실명</Label>
                <Input type="text" placeholder="객실명을 입력해주세요." />
              </FormGroup>

              <FormGroup>
                <Label>기준 인원 수 / 최대 인원 수</Label>
                <GuestCountContainer>
                  <Input
                    type="text"
                    placeholder="기준 인원 수를 입력해주세요."
                  />
                  <Input
                    type="text"
                    placeholder="최대 인원 수를 입력해주세요."
                  />
                </GuestCountContainer>
              </FormGroup>

              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Label style={{ margin: 0 }}>침대 사이즈 / 침대 개수</Label>
                  <AddButton colors={colors}>
                    <CircleIcon colors={colors}>+</CircleIcon> 침대 추가
                  </AddButton>
                </div>
                <Input
                  type="text"
                  placeholder="침대 사이즈 및 침대 개수를 입력해주세요."
                />
              </FormGroup>
            </RoomContent>
          </Section>
        </ModalContent>

        <ModalFooter>
          <RegisterButton colors={colors}>등록하기</RegisterButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default HotelRegistrationModal;
