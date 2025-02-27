import React, { useState } from "react";
import styled from "styled-components";
import { useColors } from "@context/ColorContext";

const AdminTable = ({
  headers,
  data,
  onApprove,
  onReviewClick,
  onPaymentChange,
  onThemeChange,
  onRoomCountChange,
  onEditClick,
}) => {
  const colors = useColors();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvedRows, setApprovedRows] = useState({});
  const [selectedThemes, setSelectedThemes] = useState({});
  const [selectedPayments, setSelectedPayments] = useState({});
  const [roomCounts, setRoomCounts] = useState({});

  const MIN_ROWS = 10;

  const paddedData = [...data];
  if (data.length < MIN_ROWS) {
    const emptyRows = MIN_ROWS - data.length;
    for (let i = 0; i < emptyRows; i++) {
      const emptyRow = headers.reduce((acc, header) => {
        acc[header.key] = "";
        return acc;
      }, {});
      paddedData.push(emptyRow);
    }
  }

  const handleReviewClick = (rowData) => {
    onReviewClick(rowData);
  };

  const handleApproval = (rowData) => {
    setApprovedRows((prev) => ({
      ...prev,
      [rowData.reservationNumber]: true,
    }));
    onApprove(rowData);
  };

  const handleThemeChange = (value, rowData) => {
    setSelectedThemes((prev) => ({
      ...prev,
      [rowData.hotelNumber]: value,
    }));
    onThemeChange(value, rowData);
  };

  const handlePaymentChange = (value, rowData) => {
    setSelectedPayments((prev) => ({
      ...prev,
      [rowData.reservationNumber]: value,
    }));
    onPaymentChange(value, rowData);
  };

  const handleRoomCountChange = (value, rowData) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const normalizedValue = numericValue ? String(parseInt(numericValue, 10)) : '';
    if (normalizedValue === '' || parseInt(normalizedValue, 10) >= 0) {
      setRoomCounts(prev => ({
        ...prev,
        [rowData.hotelNumber]: normalizedValue
      }));
      onRoomCountChange(normalizedValue, rowData);
    }
  };

  const renderCell = (header, value, rowData) => {
    if (value === "") return "";

    switch (header.type) {
      case "button":
        if (header.key === "approval") {
          const isApproved = approvedRows[rowData.reservationNumber];
          return (
            <Button
              onClick={() => handleApproval(rowData)}
              disabled={isApproved}
              isApproved={isApproved}
              colors={colors}
            >
              {isApproved ? "승인완료" : "승인"}
            </Button>
          );
        }
        return (
          <Button onClick={() => handleReviewClick(rowData)} colors={colors}>
            호텔리뷰
          </Button>
        );

      case "editButton":
        return (
          <EditButton onClick={() => onEditClick(rowData)} colors={colors}>
            호텔수정
          </EditButton>
        );

      case "payment":
        return value === "미결제" ? (
          <PaymentText>미결제</PaymentText>
        ) : (
          <PaymentText>결제완료</PaymentText>
        );

      case "theme":
        const selectedTheme = selectedThemes[rowData.hotelNumber] || value;
        return (
          <Select
            value={selectedTheme}
            onChange={(e) => handleThemeChange(e.target.value, rowData)}
          >
            <option value="Casino">Casino</option>
            <option value="Korean-Traditional">Korean-Traditional</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </Select>
        );

      case "input":
        return (
          <Input
            type="number"
            value={roomCounts[rowData.hotelNumber] || value}
            onChange={(e) => handleRoomCountChange(e.target.value, rowData)}
            placeholder={value}
            min="0"
            step="1"
          />
        );

      default:
        return value;
    }
  };

  return (
    <>
      <TableWrapper>
        <Table>
          <colgroup>
            {headers.map((header) => (
              <col
                key={header.key}
                style={{ width: getColumnWidth(header.type) }}
              />
            ))}
          </colgroup>
          <thead>
            <TR>
              {headers.map((header) => (
                <TH key={header.key}>{header.label}</TH>
              ))}
            </TR>
          </thead>
          <tbody>
            {paddedData.map((row, index) => (
              <TR key={index}>
                {headers.map((header) => (
                  <TD key={header.key}>
                    {renderCell(header, row[header.key], row)}
                  </TD>
                ))}
              </TR>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

const getColumnWidth = (type) => {
  switch (type) {
    case "button":
      return "10%";
    case "payment":
    case "theme":
      return "12%";
    case "input":
      return "9%";
    default:
      return "9%";
  }
};

export default AdminTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1.25rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  table-layout: fixed;
`;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  height: 3.75rem;
`;

const TH = styled.th`
  padding: 1rem;
  text-align: center;
  border-bottom: 0.125rem solid #ddd;
  background-color: #f5f5f5;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3.75rem;
`;

const TD = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 0.0625rem solid #ddd;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3.75rem;
  font-size: 0.9rem;

  &:empty {
    height: 3.75rem;
    padding: 0.75rem 1rem;
  }
`;

const Button = styled.button`
  width: 70%;
  height: 2.25rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isApproved ? "#6c757d" : props.colors.main)};
  color: white;
  cursor: ${(props) => (props.isApproved ? "default" : "pointer")};
  transition: background-color 0.2s;
  font-size: 0.875rem;
  margin: 0 auto;
  display: block;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.isApproved ? "#6c757d" : `${props.colors.main}dd`};
  }
`;

const EditButton = styled(Button)`
  width: 50%;
  background-color: #000000;

  &:hover {
    background-color: #333333;
  }
`;

const Select = styled.select`
  width: 90%;
  height: 2.25rem;
  padding: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

const PaymentText = styled.span`
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: ${(props) => (props.children === "미결제" ? "#dc3545" : "#28a745")};
`;

const Input = styled.input`
  width: 60%;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  text-align: center;
  font-size: 0.875rem;
  margin: 0 auto;
  display: block;

  &:focus {
    outline: none;
    border-color: ${props => props.colors?.main || '#0070f3'};
    box-shadow: 0 0 0 2px ${props => `${props.colors?.main}33` || '#0070f333'};
  }

  &::placeholder {
    color: #999;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
    height: 1.5rem;
    cursor: pointer;
  }
`;
