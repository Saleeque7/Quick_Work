import React from 'react';
import { Box, Flex, Text, Icon, Tooltip } from '@chakra-ui/react';
import { FaRegSave } from 'react-icons/fa';

export default function JobCards() {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p={4}
      m={4}
      ml={12}
      width={{ base: '90%', md: '80%' }}
    >
      {/* Top Left: Job Post Time */}
      <Text fontSize="xs" color="gray.500" mb={2}>Posted: 1h ago</Text>

      {/* Top Right: Save Icon */}
      <Flex justifyContent="flex-end" alignItems="center">
        <Tooltip label="Save Job">
          <Icon as={FaRegSave} color="teal.500" cursor="pointer" />
        </Tooltip>
      </Flex>

      {/* Next Row: Date and Required Heading */}
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Text fontSize="lg" fontWeight="bold">Date: May 13, 2024</Text>
        <Text fontSize="md" color="gray.600">Required</Text>
      </Flex>

      {/* Next Row: Estimated Completion Time */}
      <Text fontSize="sm" color="gray.500" mt={2}>Estimated Completion Time: 3 days</Text>

      {/* Next Row: Job Description */}
      <Text fontSize="md" mt={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Duis viverra gravida arcu, non cursus nisi commodo ut.
      </Text>

      {/* Bottom Left: Company Name and Address */}
      <Flex justifyContent="flex-start" alignItems="center" mt={4}>
        <Text fontSize="md" fontWeight="bold">Company Name</Text>
        <Text fontSize="sm" color="gray.500" ml={2}>Address, City, Country</Text>
      </Flex>

      {/* Bottom Right: Required Skills */}
      <Flex justifyContent="flex-end" alignItems="center" mt={2}>
        <Text fontSize="sm" color="teal.500">Required Skills:</Text>
        <Text fontSize="sm" ml={2}>Skill 1, Skill 2, Skill 3</Text>
      </Flex>
    </Box>
  );
}
