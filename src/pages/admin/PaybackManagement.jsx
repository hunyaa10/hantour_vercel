import React, { useState } from "react";
import styled from "styled-components";
import AdminTable from "@components/admin/AdminTable";
import CustomSearchbar from "@components/custom/CustomSearchBar";
import Pagination from "@components/admin/Pagination";

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
  const itemsPerPage = 10;
  const totalItems = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <TopSection>
        <CustomSearchbar placeholder="ID 또는 회사명을 입력해주세요" />
      </TopSection>

      <TableContainer>
        <AdminTable
          headers={[]}  // 페이백 관련 헤더 추가 필요
          data={[]}     // 페이백 데이터 추가 필요
        />
      </TableContainer>

      <PaginationContainer>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  );
};

export default PaybackManagement; 