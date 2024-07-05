// ProfileCard.jsx
import React from "react";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const ProfileClient = ({ userInfo }) => {
const navigate = useNavigate ()
    const handleNavigate =()=>{
    //  navigate('/client/home')
    }
  return (
    <Box
      display="flex"
      alignItems="center"
      p={2}
      bg="transperant"
      borderRadius="md"
      mr={10}
      
    >
      <Avatar name={userInfo.name} src={userInfo.profilePicture} onClick={handleNavigate} cursor={"pointer"}/>
      <Box ml={3}>
        <Text fontWeight="bold" color="black">
          {userInfo.name}
        </Text>
        <Text fontSize="sm" color="black">
          {userInfo.email}
        </Text>
      </Box>
    </Box>
  );
};

export default ProfileClient;
