import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.number,
  post_type: PropTypes.oneOf(["BUYING", "SELLING"]),
  event: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  available: PropTypes.bool,
  price: PropTypes.number,
  user: PropTypes.number,
});
