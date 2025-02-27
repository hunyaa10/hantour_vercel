import React, { useState } from "react";
import styled from "styled-components";
import AdminTable from "@components/admin/AdminTable";
import CustomSearchbar from "@components/custom/CustomSearchBar";
import Pagination from "@components/admin/Pagination";
import { hotelMockData } from "@data/hotelMockData";
import HotelRegistrationModal from "@components/admin/HotelRegistrationModal";

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
  background-color: #16a34a; /* green-600 */
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #15803d; /* green-700 */
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
  const itemsPerPage = 10;

  const hotelHeaders = [
    { key: "hotelName", label: "호텔명", type: "text" },
    { key: "region", label: "지역", type: "text" },
    { key: "theme", label: "테마", type: "theme" },
    { key: "availableRooms", label: "예약가능 룸 수", type: "text" },
    { key: "reservationCount", label: "예약 건 수", type: "text" },
    { key: "hotelNumber", label: "호텔 번호", type: "text" },
    { key: "review", label: "호텔 리뷰", type: "button" },
  ];

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return hotelMockData.slice(startIndex, endIndex);
  };

  const handleReviewClick = (rowData) => {
    console.log("호텔 리뷰:", rowData);
  };

  const handleThemeChange = (value) => {
    console.log("테마 변경:", value);
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
    </Container>
  );
};

export default HotelManagement;
