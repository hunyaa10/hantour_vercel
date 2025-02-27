import React from "react";
import styled from "styled-components";

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxDisplayPages = 10;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = Math.min(totalPages, maxDisplayPages);

    if (currentPage > 6 && totalPages > maxDisplayPages) {
      startPage = currentPage - 5;
      endPage = Math.min(currentPage + 4, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          $isActive={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <NavigationButton
        onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
        disabled={currentPage <= 1}
      >
        &laquo;
      </NavigationButton>
      <NavigationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        &lsaquo;
      </NavigationButton>

      {renderPageNumbers()}

      <NavigationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        &rsaquo;
      </NavigationButton>
      <NavigationButton
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 10))}
        disabled={currentPage >= totalPages}
      >
        &raquo;
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  background-color: ${(props) => (props.$isActive ? "#3182ce" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#4a5568")};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  font-family: Arial, sans-serif;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#2c5282" : "#edf2f7")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #edf2f7;
  }
`;

const NavigationButton = styled(PageButton)`
  padding: 8px;
  font-weight: bold;
`;
