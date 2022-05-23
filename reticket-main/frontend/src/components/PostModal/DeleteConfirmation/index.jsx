import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useFeedContext } from "../../Feed/FeedContext";
/**
 *
 * @param postId The id of the post is needed for the feedcontext so that we know which post to delete
 * @param onClose Tells the modal window to close
 * @returns Return a modal window where you can confirm if you want to delete a post
 */
function DeleteConfirmation({ postId, onClose }) {
  const feedContext = useFeedContext();
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete this post?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => feedContext.onPostDelete(postId)}
          >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  postId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
