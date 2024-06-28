import { Image, Text, Flex } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Flex alignItems={"flex-start"} direction={"column"} pb={5}>
      <Image src="/images/logo.png" fit="contain" mb="-20px"></Image>
    </Flex>
  );
}
