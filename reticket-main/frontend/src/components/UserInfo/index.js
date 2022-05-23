import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";

function UserInfo({ id }) {
  const [user, setUser] = React.useState(undefined);
  React.useEffect(
    function getUser() {
      axios.get(`/users/${id}/`).then((response) => setUser(response.data));
    },
    [id]
  );
  return (
    <Box bg="#FFFFFF">
      <HStack justifyContent="space-between">
        <VStack justifyContent="space-between">
          <Box>
            <Box>
              {/* Fields should be: name, age, country, city */}
              <Text>
                Name: {user?.first_name} {user?.last_name}
              </Text>
              <Text>Email: {user?.email}</Text>
            </Box>
          </Box>
          {/* <Image borderRadius="full" boxSize="300px" src={user?.image} > */}
        </VStack>
      </HStack>
    </Box>
  );
}

UserInfo.propTypes = {
  id: PropTypes.number.isRequired,
};

export default UserInfo;
