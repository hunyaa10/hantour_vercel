import React, { useState } from "react";
import styled from "styled-components";
import AdminTable from "@components/admin/AdminTable";
import CustomSearchbar from "@components/custom/CustomSearchBar";
import Pagination from "@components/admin/Pagination";
import { paybackMockData } from "@data/paybackData";

const Container = styled.div`
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TableContainer = styled.div`
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  margin-top: 1rem;
`;

const PaybackManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paybackData, setPaybackData] = useState(paybackMockData);
  const itemsPerPage = 10;

  const paybackHeaders = [
    { key: "id", label: "ID", type: "text" },
    { key: "accountHolder", label: "예금주명", type: "text" },
    { key: "bank", label: "은행명", type: "text" },
    { key: "accountNumber", label: "계좌번호", type: "text" },
    { key: "amount", label: "금액", type: "text" },
    { key: "requestDate", label: "요청일", type: "text" },
    { key: "status", label: "상태", type: "approval" },
  ];

  const handleApprove = (rowData) => {
    setPaybackData(prev => 
      prev.map(item => 
        item.id === rowData.id 
          ? { ...item, status: "Completed" }
          : item
      )
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return paybackData.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <TopSection>
        <CustomSearchbar placeholder="ID 또는 예금주명을 입력해주세요" />
      </TopSection>

      <TableContainer>
        <AdminTable
          headers={paybackHeaders}
          data={getCurrentPageData()}
          onApprove={handleApprove}
        />
      </TableContainer>

      <PaginationContainer>
        <Pagination
          totalItems={paybackData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  );
};

export default PaybackManagement; 