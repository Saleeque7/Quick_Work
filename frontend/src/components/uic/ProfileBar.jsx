import { Box, Flex, Image, Text, Divider, Stack } from "@chakra-ui/react";
import profileImage from '../../assets/pf.png';

export default function ProfileBar({user}) {
 const profile = user?.profile || profileImage
  return (
    <Box>
      <Flex
        justifyContent="start"
        alignItems="center"
        h="200px"
        bg="gray.200"
        borderRadius="2xl"
        p={2}
      >
        <Image src={profile} alt="Profile Image" boxSize="100px" borderRadius="full" mr={4} />
        <Stack spacing={2} direction="column">
          <Text textDecoration="underline" fontWeight="bold" fontSize="xl" color="green">
            {user && user.name}
          </Text>
          <Divider orientation="horizontal" />
          <Text color="gray.500" _hover={{ color: "green.500", cursor: "pointer" }}>
            Fullstack developer
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
