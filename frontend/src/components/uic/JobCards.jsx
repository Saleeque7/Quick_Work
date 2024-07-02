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

const JobCards = () => {
  const skills = ["mongodb", "sql", "mern", "mern", "mern"];
  const userReviews = [2];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
          Posted: 1h ago
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
          <Text fontSize="lg" fontWeight="bold">
            JobTItle
          </Text>
        )}
      </Flex>
      <Flex justifyContent="start" alignItems="center" mt={3} mb={8}>
        {isLoading ? (
          <Skeleton height="16px" width="20%" />
        ) : (
          <Text fontSize="xs" color="gray.500">
            Price Type:546
          </Text>
        )}
      </Flex>

      {isLoading ? (
        <Skeleton height="120px" />
      ) : (
        <Text fontSize="md" mt={4} mb={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          similique voluptate eum impedit explicabo, facere sed ipsa recusandae
          quas molestias qui error odio sint dolorem minima perferendis quis
          laborum saepe. Reprehenderit soluta dolore asperiores velit dolor
          harum, dolores iusto excepturi fugit inventore omnis ad? Dolores
          voluptatem nobis incidunt dolorum excepturi commodi, nihil qui
          similique non placeat earum sit necessitatibus omnis. Eaque
        </Text>
      )}

      <Flex justifyContent="flex-start" alignItems="center" mt={2} flexWrap="wrap">
        {skills.map((skill, index) => (
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
            Proposals limit : 20
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default JobCards;
