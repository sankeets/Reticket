// import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useCurrentUser } from "../../../contexts/UserInfoContext";
import PostModalWindow from "../../PostModal";
import ProfileImage from "../../ProfileImage";
import UserInfoModalWindow from "../../UserInfoModal";
import { StyledBox } from "./style";

function Post({ post }) {
  const [contactModalIsOpen, setContactModalState] = useState(false);
  const [postModalIsOpen, setPostModalState] = useState(false);
  const user = useCurrentUser();

  return (
    <StyledBox
      istraded={post.traded_with}
      onClick={() => setPostModalState(true)}
    >
      {postModalIsOpen && (
        <PostModalWindow post={post} onClose={() => setPostModalState(false)} />
      )}
      <HStack
        justifyContent="space-between"
        paddingTop="1em"
        paddingBottom="1em"
        paddingRight="1em"
        cursor="pointer"
      >
        <Box width="20%">
          <Center w="100%" h="50%" color="white">
            <ProfileImage userId={post.user} size="md" />
          </Center>
        </Box>
        <Box w="70%">
          <VStack alignItems="left" spacing={1}>
            <Box>
              <Heading size={4}>{post.event}</Heading>
            </Box>
            <Box>
              <Heading size={5} fontSize="sm">
                {post.location}
              </Heading>
            </Box>
            <Box>
              <Text>Price: {post.price}</Text>
            </Box>
          </VStack>
        </Box>
        <Box w="25%">
          {contactModalIsOpen && (
            <UserInfoModalWindow
              userId={post.user}
              onClose={() => setContactModalState(false)}
            />
          )}
          {post.traded_with ? (
            <Box as="button" bg="#FF3434" p="2" w="80%" borderRadius="7">
              <Text fontSize="m" color="white">
                Sold
              </Text>
            </Box>
          ) : (
            post.user !== user?.id && (
              <Button
                cursor="pointer"
                onClick={(e) => {
                  // Don't propagate, so that the onClick on the StyledBox element above is not called.
                  // This prevents the PostModalWindow from opening.
                  e.stopPropagation();
                  setContactModalState(true);
                }}
              >
                Contact
              </Button>
            )
          )}
        </Box>
      </HStack>
    </StyledBox>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    event: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    user: PropTypes.number,
    traded_with: PropTypes.number,
  }).isRequired,
};

export default Post;
