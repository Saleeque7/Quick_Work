import Navbar from "../../components/main/Navbar";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Icon,
  Divider,
} from "@chakra-ui/react";
import Carousel from "../../components/uic/Carousel";
import ProfileBar from "../../components/uic/ProfileBar";
import JobCards from "../../components/uic/JobCards";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserProfile from "../../components/user/UserProfile";
import { useUserProfile } from "../../utils/context/ProfileContext";
import { userAxiosInstance } from "../../utils/api/privateAxios";
import { getJobPost ,getsavedJobApi } from "../../utils/api/api";

export default function UserHome() {
  const { userProfile, setUserProfile } = useUserProfile();
  const user = useSelector((state) => state.persisted.user.user);
  const [activeHeading, setActiveHeading] = useState("Best Matches");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [DislikeJobs, setDislikeJobs] = useState([]);

  useEffect(() => {
    if (user.isUserProfile) {
      setUserProfile(true);
    }
  }, [user.isUserProfile]);

  useEffect(() => {
   if(activeHeading !== "Saved Jobs" ){
     fetchJobPosts(activeHeading);
   }else{
    fetchSavedJobs()
   }
  }, [activeHeading]);

  const fetchJobPosts = async (activeHeading) => {
  
    try {
      const res = await userAxiosInstance.get(getJobPost, {
        params: { activeHeading },
      });
      console.log(res.data);
      setJobs(res.data);

      
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const res = await userAxiosInstance.get(getsavedJobApi)
      setSavedJobs(res.data.map(item => item.job));
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  return (
    <>
      <Box>
        {userProfile && (
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ base: "column", md: "row" }}
              bg="gray.100"
            >
              <Box
                w={{ base: "100%", md: "75%" }}
                mb={{ base: 8, md: 0 }}
                alignItems="center"
                p={8}
                borderRadius="md"
                textAlign="center"
              >
                <Box
                  w={{ base: "100%" }}
                  minH="20vh"
                  mb={{ base: 8, md: 0 }}
                  alignItems="center"
                  justifySelf={"center"}
                  borderRadius="md"
                  textAlign="center"
                >
                  <Carousel />
                </Box>
              </Box>
              <Box
                w={{ base: "100%", md: "25%" }}
                mb={{ base: 8, md: 0 }}
                alignItems="center"
                ml={12}
                textAlign="center"
              >
                <ProfileBar user={user} />
              </Box>
            </Flex>

            <Flex
              justifyContent="flex-start"
              alignItems="start"
              flexDirection={{ base: "column", md: "row" }}
              bg="gray.100"
              p={5}
            >
              <Text
                color="teal.500"
                _hover={{ color: "green", cursor: "pointer" }}
                ml={12}
                fontSize={"2xl"}
              >
                Jobs you might like
              </Text>
            </Flex>

            <Flex
              justifyContent="flex-start"
              alignItems="start"
              flexDirection={{ base: "column", md: "row" }}
              bg="gray.100"
              p={5}
            >
              {["Best Matches", "Most Recent", "Saved Jobs"].map((heading) => (
                <Box
                  key={heading}
                  fontSize="xl"
                  fontWeight="bold"
                  mr={4}
                  mb={{ base: 4, md: 0 }}
                  color={activeHeading === heading ? "green" : "dark"}
                  ml={5}
                  _hover={{ color: "teal.700", cursor: "pointer" }}
                  onClick={() => setActiveHeading(heading)}
                  pl={8}
                >
                  {heading}
                </Box>
              ))}
            </Flex>

            <Flex
              flexDirection={{ base: "column", md: "row" }}
              bg="gray.100"
              mt={-4}
            >
              <Box ml={16} w={{ base: "100%", md: "80%" }}>
                <Divider borderColor={"gray"} />
              </Box>
            </Flex>

            <Flex
              flexDirection={{ base: "column", md: "row" }}
              bg="gray.100"
              fontSize={"xs"}
              p={4}
            >
              <Text ml={16}>
                {activeHeading === "Best Matches"
                  ? `*Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.`
                  : activeHeading === "Most Recent"
                  ? `*Browse the most recent jobs that match your skills and profile description to the skills clients are looking for.`
                  : activeHeading === "Saved Jobs"
                  ? `*Apply for jobs from the saved list.`
                  : null}
              </Text>
            </Flex>

            <Flex flexDirection={{ base: "column", md: "row" }} bg="gray.100">
              <Box ml={16} w={{ base: "100%", md: "80%" }}>
                <Divider borderColor={"gray"} />
              </Box>
            </Flex>

            <Flex
              flexDirection={{ base: "column", md: "column" }}
              bg="gray.100"
              p={5}
            >
              <JobCards jobs={jobs} activeHeading={activeHeading}   savedJobs={savedJobs} setSavedJobs={setSavedJobs} DislikeJobs={DislikeJobs} setDislikeJobs={setDislikeJobs}/>
            </Flex>
          </Box>
        )}

        {!userProfile && <UserProfile user={user} />}
      </Box>
    </>
  );
}
