import React, { useState } from "react";
import styled from "styled-components";
import AdminTable from "@components/admin/AdminTable";
import CustomSearchbar from "@components/custom/CustomSearchBar";
import Pagination from "@components/admin/Pagination";
import { hotelMockData } from "@data/hotelMockData";
import HotelRegistrationModal from "@components/admin/HotelRegistrationModal";
import ReviewModal from "@components/ReviewModal";

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RegisterButton = styled.button`
  background-color: #000000;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #333333;
  }
`;

const TableContainer = styled.div`
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  margin-top: 1rem;
`;

const HotelManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const itemsPerPage = 10;

  const hotelHeaders = [
    { key: "hotelName", label: "호텔명", type: "text" },
    { key: "region", label: "지역", type: "text" },
    { key: "theme", label: "테마", type: "theme" },
    { key: "availableRooms", label: "예약가능 룸 수", type: "text" },
    { key: "reservationCount", label: "예약 건 수", type: "text" },
    { key: "hotelNumber", label: "호텔 번호", type: "text" },
    { key: "review", label: "호텔 리뷰", type: "button" },
    { key: "edit", label: "호텔 수정", type: "editButton" },
  ];

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return hotelMockData.slice(startIndex, endIndex);
  };

  const handleReviewClick = (rowData) => {
    setSelectedHotel(rowData);
    setIsReviewModalOpen(true);
  };

  const handleThemeChange = (value) => {
    console.log("테마 변경:", value);
  };

  const handleRoomCountChange = (value, rowData) => {
    console.log('Room count changed:', { hotelNumber: rowData.hotelNumber, newCount: value });
    // API 호출 로직 추가
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 호텔등록 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 호텔등록 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (rowData) => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      <TopSection>
        <CustomSearchbar placeholder="호텔명을 입력해주세요" />
        <RegisterButton onClick={openModal}>호텔등록</RegisterButton>
      </TopSection>

      <TableContainer>
        <AdminTable
          headers={hotelHeaders}
          data={getCurrentPageData()}
          onReviewClick={handleReviewClick}
          onThemeChange={handleThemeChange}
          onRoomCountChange={handleRoomCountChange}
          onEditClick={handleEditClick}
        />
      </TableContainer>

      <PaginationContainer>
        <Pagination
          totalItems={hotelMockData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>

      {isModalOpen && <HotelRegistrationModal onClose={closeModal} />}
      {isReviewModalOpen && (
        <ReviewModal 
          setShowReviewModal={setIsReviewModalOpen}
          reviews={[]}
        />
      )}
    </Container>
  );
};

export default HotelManagement;
