import { Box, Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import StarRating from "../StarRating";

function SetRating({ userId }) {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const sendRating = () => {
    setHasRated(true);
    axios.post(`/users/${userId}/rate/`, { value: rating });
  };
  if (hasRated) return "Thanks for your rating.";
  return (
    <HStack justify="space-between">
      <Box>
        <StarRating rating={rating} onChange={setRating} readonly={false} />
      </Box>
      <Box>
        <Button onClick={sendRating}>Send rating</Button>
      </Box>
    </HStack>
  );
}

SetRating.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default SetRating;
