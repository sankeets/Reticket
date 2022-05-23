import styled from "styled-components";
import { StarIcon } from "@chakra-ui/icons";

export const Star = styled(StarIcon)`
  font-size: 2em;
  margin: 5px;
  color: ${(props) => (props.active ? "rgb(241, 208, 69)" : "#eee")};
  cursor: ${(props) => (props.readonly ? "default" : "pointer")};
`;
