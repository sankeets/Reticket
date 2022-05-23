import { Box, Divider, Heading, HStack, StackDivider } from "@chakra-ui/react";
import Feed from "../../../components/Feed";

function FeedPage() {
  return (
    <HStack
      divider={<StackDivider borderColor="gray.200" />}
      width="100%"
      justifyContent="space-around"
      height="100%"
      top="0%"
      backgroundColor="#F5F5F3"
      padding="1em"
      overflow="hidden"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="start"
      >
        <Heading size={2} textAlign="center" fontSize="1.5em">
          For sale
        </Heading>
        <Divider margin="10px" borderColor="gray.200" />
        <Feed type="SELLING" />
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="start"
      >
        <Heading size={2} textAlign="center" fontSize="1.5em">
          Wanted
        </Heading>
        <Divider margin="10px" borderColor="gray.200" />
        <Feed type="BUYING" />
      </Box>
    </HStack>
  );
}

export default FeedPage;
