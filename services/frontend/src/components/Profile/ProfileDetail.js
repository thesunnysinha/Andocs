import React, { useState } from "react";
import styled from "styled-components";
import { Button, Typography, Box, Modal } from "@mui/material";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

const EditProfileContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const ProfileDetail = () => {
  const { user_data } = useSelector((state) => state.user);

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});

  const handleOpenEditProfile = (user_data) => {
    setSelectedProfile(user_data);
    setOpenEditProfile(true);
  };
  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  return (
    <Container>
      <Modal open={openEditProfile} onClose={handleCloseEditProfile}>
        <EditProfileContainer>
          <EditProfile
            selectedProfile={selectedProfile}
            handleCloseEditProfile={handleCloseEditProfile}
          />
        </EditProfileContainer>
      </Modal>
      <ProfileContainer>
        <Box ml={2}>
          <Typography variant="h5">{user_data.name}</Typography>
          <Typography variant="subtitle1">
            {user_data.date_of_birth} | {user_data.gender}
          </Typography>
          <Typography variant="subtitle2">
            {user_data.phone} | {user_data.email}
          </Typography>
        </Box>
        <ButtonContainer>
          <Button
            onClick={() => handleOpenEditProfile(user_data)}
            variant="contained"
            color="secondary"
          >
            Edit profile
          </Button>
        </ButtonContainer>
      </ProfileContainer>
    </Container>
  );
};

export default ProfileDetail;
