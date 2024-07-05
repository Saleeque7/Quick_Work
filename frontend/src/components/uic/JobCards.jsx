import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import {
  HiOutlineBookmark,
  HiOutlineThumbDown,
  HiLocationMarker,
} from "react-icons/hi";
import Rating from "./Rating";


const JobCards = ({jobs}) => {
  const skills = ["mongodb", "sql", "mern", "mern", "mern"];
  const userReviews = [2];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
  

    const diff = now.getTime() - date.getTime();
  

    const seconds = Math.floor(diff / 1000);
  
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    } else {

      const today = now.setHours(0, 0, 0, 0);
      const yesterday = new Date(today - 86400000); 
    
      if (date.getTime() >= today) {
        return 'today';
      } else if (date.getTime() >= yesterday.getTime()) {
        return 'yesterday';
      } else {

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      }
    }
  };

  return (
    <>
    {jobs.map((job, index) => (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="xl"
      p={8}
      m={4}
      ml={12}
      width={{ base: "90%", md: "80%" }}
    >
     
      {isLoading ? (
        <Skeleton height="20px" mb="4" />
      ) : (
        <Text fontSize="xs" color="gray.500">
          Posted:{timeAgo(job.createdAt)}
        </Text>
      )}

      <Flex justifyContent="flex-end" alignItems="center">
        <Tooltip label="Not Interested">
          <IconButton
            icon={<HiOutlineThumbDown />}
            color="teal.700"
            fontSize="2xl"
            cursor="pointer"
            mr={4}
            aria-label="Not Interested"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Save Job">
          <IconButton
            icon={<HiOutlineBookmark />}
            color="teal.700"
            fontSize="2xl"
            cursor="pointer"
            mr={8}
            aria-label="Save Job"
            variant="ghost"
          />
        </Tooltip>
      </Flex>
      <Flex justifyContent="start" alignItems="center" mt={-3}>
        {isLoading ? (
          <Skeleton height="24px" width="50%" />
        ) : (
          <Text fontSize="xl" fontWeight="bold" color={"teal"}>
            {job.jobRole}
          </Text>
        )}
      </Flex>
      <Flex justifyContent="start" alignItems="center" mt={3} mb={8}>
        {isLoading ? (
          <Skeleton height="16px" width="20%" />
        ) : (
          <Text fontSize="xs" color="gray.500">
           {job.projectTerm} - {job.budgetType}Price - ₹{job.budget}
          </Text>
        )}
      </Flex>

      {isLoading ? (
        <Skeleton height="120px" />
      ) : (
        <Text fontSize="md"  mb={4}>
         {job.description}
        </Text>
      )}

      <Flex justifyContent="flex-start" alignItems="center" mt={2} flexWrap="wrap">
        {job.skills.map((skill, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            border="1px solid gray.400"
            boxShadow="sm"
            bg="gray.200"
            borderRadius="md"
            m={2}
            px={4}
            py={2}
          >
            {isLoading ? (
              <Skeleton height="16px" width="40px" />
            ) : (
              skill
            )}
          </Box>
        ))}
      </Flex>

      {!isLoading && <Rating reviews={userReviews} />}
      <Flex justifyContent="start" alignItems="center" mt={3} >
        {isLoading ? (
          <Skeleton height="16px" width="20%" />
        ) : (
          <Text fontSize="xs" color="gray.500">
            Proposals  : 20
          </Text>
        )}
      </Flex>
    </Box>
      ))}
    </>
  );
};

export default JobCards;
