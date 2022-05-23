import {
  Button,
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function ReportModalWindow({ reportedUserId, onClose }) {
  const [reportedState, setResportedState] = useState();
  const [description, setDescription] = useState();
  React.useEffect(() => {
    axios
      .get(`/users/${reportedUserId}/`)
      .then((response) => setResportedState(response.data));
  }, []);

  const reportUser = React.useCallback(() => {
    axios.post(`/users/${reportedUserId}/report/`, { description });
  });
  return (
    <Modal isOpen onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="#efefef">
        <ModalHeader> Report this user: {reportedState?.email}</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="0 2em 2em">
          <FormControl>
            <FormLabel> Reportmessage </FormLabel>
            <Input
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter why this user should be reported."
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              reportUser();
              onClose();
            }}
          >
            Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ReportModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  reportedUserId: PropTypes.number.isRequired,
};

export default ReportModalWindow;
