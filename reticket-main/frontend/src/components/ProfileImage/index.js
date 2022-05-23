import { Avatar, Center } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserInfoModalWindow from "../UserInfoModal";

function ProfileImage({ userId, size = "sm" }) {
  const [userObj, setUserObj] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  useEffect(() => {
    axios
      .get(`/users/${userId}/`)
      .then((response) => setUserObj(response.data));
  }, []);
  return (
    <>
      {showContactModal && (
        <UserInfoModalWindow
          userId={userId}
          onClose={() => setShowContactModal(false)}
        />
      )}
      <Center>
        <Avatar
          size={size}
          src={userObj?.image}
          name={`${userObj?.first_name} ${userObj?.last_name}`}
          onClick={(e) => {
            e.stopPropagation();
            setShowContactModal(true);
          }}
          cursor="pointer"
        />
      </Center>
    </>
  );
}

ProfileImage.defaultProps = {
  size: "sm",
};

ProfileImage.propTypes = {
  userId: PropTypes.number.isRequired,
  size: PropTypes.string,
};

export default ProfileImage;
