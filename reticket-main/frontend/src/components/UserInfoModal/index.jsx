import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { BigProfileImage } from "../../containers/ApplicationPage/ProfilePage/style";
import DisplayRating from "../DisplayRating";
import UserInfo from "../UserInfo";

/**
 * @param post post from backend
 * @param onClose state of the modal
 * @returns modal containing user info to the corresponding post
 */
function UserInfoModalWindow({ userId, onClose }) {
  const [user, setUser] = React.useState(undefined);

  /**
   * @returns nothing. Retrieves and sets user from backend.
   */
  React.useEffect(
    function getUser() {
      axios.get(`/users/${userId}/`).then((response) => setUser(response.data));
    },
    [userId]
  );
  return (
    <Modal isOpen onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="#efefef">
        <ModalHeader>Contact information</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="0 2em 2em">
          <VStack spacing={5}>
            <Box width="100%">
              <HStack spacing={5} justify="space-between">
                <Box>
                  <VStack>
                    <BigProfileImage imageUrl={user?.image} size="150px" />
                  </VStack>
                </Box>
                <Box bg="white" borderRadius="5px" padding="2em">
                  <Table>
                    <Tbody>
                      <Tr>
                        <Td mb="5">{user && <UserInfo id={user.id} />}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </HStack>
            </Box>
            <Box background="white" w="100%" borderRadius="5px" padding="1em">
              <Heading size={4}>Rating</Heading>
              <DisplayRating userId={userId} />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

UserInfoModalWindow.propTypes = {
  userId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserInfoModalWindow;
