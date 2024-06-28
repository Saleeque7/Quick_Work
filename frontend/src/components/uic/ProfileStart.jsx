import { Box, Flex, Image, Text, Container, Button } from "@chakra-ui/react";

import welcome from "../../assets/welcome.png";
import { ArrowForwardIcon } from "@chakra-ui/icons";
export default function ProfileStart({onProfileStart  , user}) {
    
 
  return (
    <Box bg={"gray.300"}>
    
      <Container
        maxW="3xl"
        py={{ base: "8", md: "20" }}
        px={{ base: "0", sm: "8" }}
        mt={-4}
      >
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg="white"
          boxShadow="md"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          bgGradient={[
            "linear(to-tr, teal.300, yellow.400)",
            "linear(to-t, blue.200, teal.100)",
            "linear(to-b, orange.100, purple.100)",
          ]}
        >
          <Flex alignItems="center" flexDirection="column">
            <Image
              width={{ base: "90%", md: "50%", lg: "500px" }}
              src={welcome}
            />
            <Text
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"teal.500"}
              mb={6}
            >
              Welcome to QuickWork {user?user.name : ""}
            </Text>
            <Text  textAlign={"center"} fontSize={"md"} fontWeight={"bold"} mb={6}>
              We need to get a sense of your profile, experience and skills.
              It’s quickest to import your information — you can edit it before
              your profile goes live.
            </Text>
            <Button
              bg={"teal.900"}
              color={"white"}
              rightIcon={<ArrowForwardIcon />}
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
              onClick={onProfileStart }
            >
              
              Let's Get Started
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
