import { FaChevronLeft, FaChevronRight } from "react-icons/fa";import {
    Text,
    Flex,
    IconButton,
  } from "@chakra-ui/react";
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <IconButton
          icon={<FaChevronLeft />}
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
        />
        <Text mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <IconButton
          icon={<FaChevronRight />}
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
        />
      </Flex>
    );
  };