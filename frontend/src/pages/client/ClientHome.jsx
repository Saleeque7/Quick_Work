import Footer from "../../components/main/footer";
import {
  Box,
  Flex,
  Tooltip,
  Button,
  Icon,
  Text,
  Stack,
  SimpleGrid,
  Heading,
  Image,
} from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserProfileCards from "../../components/uic/userProfileCards";
import searchImage from "../../assets/search.webp";
import UserJobProposal from "../../components/uic/UserJobProposal";
import Navbar from "../../components/main/Navbar";
import { useSelector } from "react-redux";

export default function ClientHome() {
  const client = useSelector((state)=>state.persisted.client.client)

  return (
    <>
      <Box>
        <Navbar userInfo={client}/>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          bg="gray.100"
          p={5}
        >
          <Box
            w={{ base: "100%", md: "100%" }}
            alignItems="center"
            minH="30vh"
            p={12}
            m={12}
            mt={-0.1}
            borderRadius="xl"
            boxShadow="md"
            bg={"gray.700"}
          >
            <Text fontSize="md" color="white" mt={-6}>
              Hire a pro
            </Text>
            <Flex justifyContent="space-between" alignItems="center" mt={2}>
              <Text fontSize="4xl" mt={2} color="white">
                Get started and connect with talent to get work done
              </Text>
              <Box mt={4} position="relative">
                <Tooltip label="post a job">
                  <Button
                    variant="outline"
                    color="white"
                    _hover={{ color: "green.500", cursor: "pointer" }}
                  >
                    <Icon as={AddIcon} mr={2} />
                    Post a job
                  </Button>
                </Tooltip>
              </Box>
            </Flex>
            <Stack direction="row" spacing={4} mt={4}>
              <Button rightIcon={<ArrowForwardIcon />}>browse talent</Button>
            </Stack>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          bg="gray.100"
          p={5}
        >
          <SimpleGrid columns={{ base: 1, md: 4 }} mt={-16}>
            <Box
              bgGradient="linear(to-b, purple.200, orange.200)"
              boxShadow="md"
              w={{ base: "100%", md: "75%" }}
              minH={"50vh"}
              m={10}
              alignItems={"center"}
              borderRadius="md"
              
            >
              <Heading
                justifyContent={"flex-start"}
                color={"gray.700"}
                size={"xm"}
                m={6}
              >
                Guide tour
              </Heading>
              <Text
                justifyContent={"flex-start"}
                m={6}
                fontSize="xl"
                fontWeight="bold"
                color={"gray.700"}
              >
                Check out top rated talent for your open job posts{"  "}
                <ArrowForwardIcon />
              </Text>
              <Flex justifyContent="center" alignItems="center" h="120px">
                <Image src={searchImage} boxSize="200px" mt={3} maxW="200px" />
              </Flex>
            </Box>
            <UserProfileCards />
          </SimpleGrid>
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="start"
          flexDirection={{ base: "column", md: "coloumn" }}
          bg="gray.100"
          p={5}
        >
          <Box mt={-5} >
            <Text ml={12} fontWeight={"bold"} fontSize={"xl"}>
              Project Proposals
            </Text>
            <Box mt={5}>
             
              {/* {proposals.map((user, index) => ( */}
              <UserJobProposal />
              {/* ))} */}
            </Box>
          </Box>
        </Flex>
        <Footer />
      </Box>
    </>
  );
}
