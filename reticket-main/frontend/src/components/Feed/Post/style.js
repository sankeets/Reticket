import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const StyledBox = styled(Box)`
  background-color: ${(props) => (props.istraded ? "#dfdfdf" : "#ffffff")};
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  border-radius: 3px;
`;

StyledBox.propTypes = {
  isTraded: PropTypes.bool,
};
