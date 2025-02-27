import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProfileApi, updateProfileApi } from "@api/axiosApi";
import { useColors } from "@context/ColorContext";

import PencilIcon from "@assets/icons/pencil.svg";
import CustomInput from "@components/custom/CustomInput";

const EditMyInfo = () => {
  const colors = useColors();
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email_name: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileApi();
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const isAdmin = userInfo.email === "admin@example.com";

        if (response.data) {
          setInfo({
            first_name: isAdmin ? "admin" : response.data.firstName || "",
            last_name: isAdmin ? "admin" : response.data.lastName || "",
            company_name: response.data.companyName || "",
            email_name: response.data.email || "",
          });
        }
      } catch (error) {
        console.error("프로필 데이터 가져오기 실패:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (value, key) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveChanges = async () => {
    try {
      const profileData = {
        firstName: info.first_name,
        lastName: info.last_name,
        companyName: info.company_name,
        email: info.email_name,
      };

      const response = await updateProfileApi(profileData);
      console.log("프로필 수정 완료:", response);

      alert("Your information has been modified successfully.");
      setIsEditable(false);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <MainContent>
      <ContentHeader>
        <div>
          <ContentTitle>Basic Information</ContentTitle>
          <ContentDescription>
            Check and edit your personal information
          </ContentDescription>
        </div>
        <EditButton onClick={handleEditClick}>
          <img src={PencilIcon} alt="pencil-icon" />
        </EditButton>
      </ContentHeader>

      <Form>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <CustomInput
            id="firstName"
            labelText=""
            placeholder="Enter your first name"
            value={info.first_name}
            disabled={!isEditable}
            onChange={(value) => handleInputChange(value, "first_name")}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <CustomInput
            id="lastName"
            labelText=""
            placeholder="Enter your last name"
            value={info.last_name}
            disabled={!isEditable}
            onChange={(value) => handleInputChange(value, "last_name")}
          />
        </FormGroup>
        <FormGroup fullWidth>
          <Label htmlFor="companyName">Company Name</Label>
          <CustomInput
            id="companyName"
            labelText=""
            placeholder="Enter your company name"
            value={info.company_name}
            disabled={!isEditable}
            onChange={(value) => handleInputChange(value, "company_name")}
          />
        </FormGroup>
        <FormGroup fullWidth>
          <Label htmlFor="email">Email</Label>
          <CustomInput
            id="email"
            labelText=""
            placeholder="Enter your email"
            value={info.email_name}
            disabled={!isEditable}
            onChange={(value) => handleInputChange(value, "email_name")}
            validateType="email"
            onError={(isError) => {
              if (isError) {
                console.log("Invalid email address");
              }
            }}
          />
        </FormGroup>
      </Form>

      <ButtonContainer>
        <SaveButton 
          onClick={handleSaveChanges} 
          disabled={!isEditable}
          colors={colors}
        >
          Save Changes
        </SaveButton>
      </ButtonContainer>
    </MainContent>
  );
};

export default EditMyInfo;

const MainContent = styled.main`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: calc(90vh - 4rem);
  overflow-y: auto;
  overscroll-behavior: contain;

  @media screen and (max-width: 1024px) {
    height: calc(92vh - 4rem);
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ContentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
`;

const ContentDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  img {
    width: 24px;
    height: 24px;
    opacity: 0.6;
  }

  &:hover {
    color: #4f46e5;

    img {
      opacity: 1;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  ${({ fullWidth }) => fullWidth && "grid-column: 1 / -1;"}
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.colors.main};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.colors.main};
    opacity: 0.9;
  }
`;
