import { Box, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Star } from "./style";

function StarRating({ readonly, rating, onChange }) {
  const [hover, setHover] = useState();
  return (
    <HStack justify="center" w="100%">
      <Box onMouseLeave={() => setHover(rating)}>
        {[...Array(5)].map((star, index) => {
          const value = index + 1;
          return (
            <Star
              key={value}
              onClick={() => readonly === false && onChange(value)}
              onMouseEnter={() => readonly === false && setHover(value)}
              active={value <= (hover || rating)}
              readonly={readonly}
            />
          );
        })}
      </Box>
    </HStack>
  );
}

StarRating.propTypes = {
  readonly: PropTypes.bool,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

StarRating.defaultProps = {
  readonly: true,
  rating: 0,
  onChange: () => {
    throw Error(
      "You need to send an onChange function to StarRating if readonly is false."
    );
  },
};

export default StarRating;
