import { Container } from "@chakra-ui/react";
import styled from "styled-components";

export const BigProfileImage = styled(Container)`
  width: ${(props) => props.size ?? "300px"};
  height: ${(props) => props.size ?? "300px"};
  background-image: url("${(props) =>
    props.imageUrl?.startsWith("http")
      ? props.imageUrl
      : `http://localhost:8000${props.imageUrl}`}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 100%;
`;
