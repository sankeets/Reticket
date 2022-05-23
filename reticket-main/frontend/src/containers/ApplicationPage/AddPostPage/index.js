import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../../components/PostForm";
import { useCurrentUser } from "../../../contexts/UserInfoContext";

function AddPostPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  if (!user)
    return (
      <HStack
        divider={<StackDivider borderColor="gray.200" />}
        width="100%"
        justifyContent="space-around"
        height="100%"
        top="0"
        backgroundColor="#F5F5F3"
        padding="0.5em"
        overflowY="auto"
      >
        <Center width="100%" height="100vh">
          <VStack>
            <Box>You need to log in to view this page.</Box>
            <Box>
              <Button onClick={() => navigate("/login?returnTo=/create-post")}>
                Log in
              </Button>
            </Box>
          </VStack>
        </Center>
      </HStack>
    );
  return (
    <HStack
      divider={<StackDivider borderColor="gray.200" />}
      width="100%"
      justifyContent="space-around"
      top="0"
      backgroundColor="#F5F5F3"
      padding="0.5em"
      overflowY="auto"
    >
      <Container height="100%">
        <PostForm onSubmit={() => navigate("/")} />
      </Container>
    </HStack>
  );
}

export default AddPostPage;
