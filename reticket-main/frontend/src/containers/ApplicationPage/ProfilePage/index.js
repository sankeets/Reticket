import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import DisplayRating from "../../../components/DisplayRating";
import Feed from "../../../components/Feed";
import UserInfo from "../../../components/UserInfo";
import { useCurrentUser } from "../../../contexts/UserInfoContext";
import { BigProfileImage } from "./style";

function ProfilePage() {
  const user = useCurrentUser();
  return (
    <HStack
      width="100%"
      height="100%"
      display="flex"
      overflow="scroll"
      padding="1em"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        width="100%"
        height="100%"
        display="flex"
        overflow="scroll"
        padding="1em"
      >
        <Container>
          <Container boxShadow="xs">
            <Flex color="black">
              <Box>
                <Heading>Personal Info</Heading>
              </Box>
              <Spacer />
            </Flex>
            <HStack mb="5">{user && <UserInfo id={user.id} />}</HStack>
          </Container>
          <HStack spacing="24px" mb="5" padding="2" shadow="xs">
            <Box width="100%">
              <Heading size={2} textAlign="center" fontSize="1.5em">
                Tickets you are selling
              </Heading>
              <Feed type="SELLING" user={user?.id} />
            </Box>
          </HStack>
          <HStack mb="5" shadow="xs" padding="2">
            <Box width="100%">
              <Heading size={2} textAlign="center" fontSize="1.5em">
                Tickets you want to buy
              </Heading>
              <Feed type="BUYING" user={user?.id} />
            </Box>
          </HStack>
        </Container>
      </VStack>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        width="100%"
        height="100%"
        padding="1em"
      >
        <Container boxShadow="xs" p="5" centerContent>
          <BigProfileImage imageUrl={user?.image} />
          {user && <DisplayRating userId={user.id} />}
        </Container>
      </VStack>
    </HStack>
  );
}

export default ProfilePage;
