import React, { useState } from "react";
import CustomSearchbar from "@components/custom/CustomSearchBar";
import AdminTable from "@components/admin/AdminTable";
import Pagination from "@components/admin/Pagination";
import { reservationMockData } from "@data/reservationMockData";

const ReservationManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const reservationHeaders = [
    { key: "reservationDate", label: "예약일", type: "text" },
    { key: "reservationNumber", label: "예약번호", type: "text" },
    { key: "agencyName", label: "여행사", type: "text" },
    { key: "agencyId", label: "예약자ID", type: "text" },
    { key: "hotelName", label: "호텔명", type: "text" },
    { key: "guestName", label: "투숙자 성명", type: "text" },
    { key: "numberOfGuests", label: "인원", type: "text" },
    { key: "numberOfRooms", label: "객실 수", type: "text" },
    { key: "approval", label: "예약 승인", type: "button" },
    { key: "payment", label: "결제", type: "payment" },
  ];

  const handleApprove = (rowData) => {
    console.log("예약 승인:", rowData);
  };

  const handlePaymentChange = (value) => {
    console.log("결제 상태 변경:", value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <CustomSearchbar placeholder="예약번호 또는 예약 회사명을 입력해주세요" />
      <AdminTable
        headers={reservationHeaders}
        data={reservationMockData}
        onApprove={handleApprove}
        onPaymentChange={handlePaymentChange}
      />

      <Pagination
        totalItems={reservationMockData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ReservationManagement;
