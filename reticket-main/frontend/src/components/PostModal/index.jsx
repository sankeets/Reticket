import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/UserInfoContext";
import postShape from "../../shapes/post";
import { useFeedContext } from "../Feed/FeedContext";
import PostForm from "../PostForm";
import { SELLING } from "../PostForm/constants";
import ProfileImage from "../ProfileImage";
import ReportModalWindow from "../ReportModal";
import SetRating from "../SetRating";
import DeleteConfirmation from "./DeleteConfirmation";

/**
 * @param post we need to pass a post to the function so that we can show the information we need to display
 * @param onClose tells the function if the modal window needs to be closed
 * @returns a modal window which displays information about a single post
 */
function PostModalWindow({ post, onClose }) {
  const currentUser = useCurrentUser();
  const [reportModal, setReportModal] = useState(false);
  const feedContext = useFeedContext();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [selectedUser, selectUser] = useState();
  useEffect(function getUsers() {
    axios.get("/users/").then((response) => setAllUsers(response.data));
  }, []);
  const postedBy = allUsers?.find((user) => user.id === post.user);
  return (
    <Modal isOpen onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="#efefef">
        <ModalHeader>
          {editMode ? (
            <Grid templateColumns="repeat(7, 1fr)" gap={4}>
              <GridItem colSpan={1}>
                <IconButton
                  colorScheme="teal"
                  aria-label="Search database"
                  icon={<ArrowBackIcon />}
                  onClick={() => setEditMode(false)}
                />
              </GridItem>
              <GridItem colStart={3} colEnd={7}>
                {post.event}
              </GridItem>
            </Grid>
          ) : (
            <Box>{post.event}</Box>
          )}
        </ModalHeader>
        <ModalCloseButton />
        {deleteMode && (
          <DeleteConfirmation
            postId={post.id}
            onClose={() => setDeleteMode(false)}
          />
        )}
        {reportModal && (
          <ReportModalWindow
            reportedUserId={post.user}
            onClose={() => setReportModal(false)}
          />
        )}
        <ModalBody padding="0 2em 2em">
          {editMode ? (
            <PostForm
              post={post}
              onSubmit={(newValues) => {
                feedContext.onPostUpdate(newValues);
                setEditMode(false);
              }}
            />
          ) : (
            <VStack spacing={10}>
              <Box width="100%">
                <HStack spacing={10} justify="space-between">
                  <Box>
                    <ProfileImage size="xl" userId={post.user} />
                    <Text textAlign="center">
                      {postedBy?.first_name} {postedBy?.last_name}
                    </Text>
                  </Box>
                  <Box bg="white" borderRadius="5px" padding="1em">
                    <HStack justify="space-between">
                      <Heading size={4}>{post.post_type}</Heading>
                      {post.user === currentUser?.id && (
                        <HStack spacing="2">
                          <Box>
                            <IconButton
                              aria-label="Edit post"
                              icon={<EditIcon />}
                              onClick={() => setEditMode(true)}
                            />
                          </Box>
                          <Box>
                            <IconButton
                              aria-label="Delete post"
                              icon={<DeleteIcon />}
                              onClick={() => setDeleteMode(true)}
                            />
                          </Box>
                        </HStack>
                      )}
                    </HStack>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Td>Event:</Td>
                          <Td>{post.event}</Td>
                        </Tr>
                        <Tr>
                          <Td>Location:</Td>
                          <Td>{post.location}</Td>
                        </Tr>
                        <Tr>
                          <Td>Price</Td>
                          <Td>{post.price}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </HStack>
              </Box>
              <Box width="100%" bg="white" borderRadius="5px" padding="1em">
                <Heading size={5}>Description: </Heading>
                {post.description || "No description"}
              </Box>
              {post.user === currentUser?.id && !post.traded_with && (
                <Box width="100%" bg="white" borderRadius="5px" padding="1em">
                  <Heading size={5}>
                    Mark as{" "}
                    {post.post_type === SELLING ? "sold to" : "bought from"}:
                  </Heading>
                  <HStack paddingTop="1">
                    <Select
                      onChange={(event) => selectUser(event.target.value)}
                    >
                      <option>--</option>
                      {allUsers
                        ?.filter((user) => user.id !== currentUser?.id)
                        .map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.email}
                          </option>
                        ))}
                    </Select>
                    <Button
                      disabled={!selectedUser}
                      onClick={() =>
                        axios
                          .patch(`/posts/${post.id}/`, {
                            traded_with: selectedUser,
                          })
                          .then((response) =>
                            feedContext.onPostUpdate(response.data)
                          )
                      }
                    >
                      Submit
                    </Button>
                  </HStack>
                </Box>
              )}
              {post.traded_with && post.user === currentUser?.id && (
                <Box width="100%" bg="white" borderRadius="5px" padding="1em">
                  <VStack align="start">
                    <Box>
                      {post.post_type === SELLING ? "Sold to" : "Bought from"}:{" "}
                      {
                        allUsers?.find((user) => user.id === post.traded_with)
                          ?.email
                      }
                    </Box>
                    <Box>
                      <SetRating userId={post.traded_with} />
                    </Box>
                  </VStack>
                </Box>
              )}
              {currentUser?.id === post.traded_with && (
                <Box bg="white" width="100%" padding="1em" borderRadius="5px">
                  <Text>
                    You{" "}
                    {post.post_type === SELLING
                      ? "bought this ticket from"
                      : "sold this ticket to"}{" "}
                    {allUsers?.find((user) => user.id === post.user)?.email}.
                  </Text>
                  <Text>Leave a rating?</Text>
                  <SetRating userId={post.user} />
                </Box>
              )}
              <Button
                colorScheme="red"
                mr={8}
                ml={8}
                onClick={() => setReportModal(true)}
                width="100%"
              >
                Report
              </Button>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

PostModalWindow.propTypes = {
  post: postShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostModalWindow;
