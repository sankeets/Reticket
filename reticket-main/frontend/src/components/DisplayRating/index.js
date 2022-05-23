import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import StarRating from "../StarRating";

function DisplayRating({ userId }) {
  const [rating, setRating] = useState();
  useEffect(function getRating() {
    axios
      .get(`/users/${userId}/rating/`)
      .then((response) => setRating(response.data));
  }, []);
  return <StarRating rating={rating} />;
}

DisplayRating.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default DisplayRating;
