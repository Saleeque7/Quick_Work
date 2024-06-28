import { SimpleGrid, Box, Heading, Text, Button } from "@chakra-ui/react";

export default function UserProfileCards() {
  return (
    <>
      <Card>
        <CardHeader>Customer Dashboard</CardHeader>
        <CardBody>
          View a summary of all your customers over the last month.
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="teal">
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}


const Card = ({ children }) => (
  <Box
    bg="white"
    boxShadow="md"
    w={{ base: "100%", md: "75%" }}
    minH={"50vh"}
    m={10}
    justifyContent={"center"}
    textAlign={"center"}
    alignContent={"center"}
    borderRadius="md"
    
  >
    {children}
  </Box>
);


const CardHeader = ({ children }) => (
  <Heading size="md" mb={2}>
    {children}
  </Heading>
);


const CardBody = ({ children }) => <Text>{children}</Text>;


const CardFooter = ({ children }) => <Box mt={4}>{children}</Box>;
