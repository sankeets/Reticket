import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { NavLink as ReactNavLink, useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  useUserInfoContext,
} from "../../contexts/UserInfoContext";
import ProfileImage from "../ProfileImage";
import NavLink from "./NavLink";

const HeaderItems = [{ href: "/create-post", icon: AddIcon, text: "New post" }];
export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useCurrentUser();
  const navigate = useNavigate();
  const userContext = useUserInfoContext();

  return (
    <Box bg={useColorModeValue("#87A8A4", "blue.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>
            <ReactNavLink to="/">
              <Image boxSize="90px" src="/reticketLogo.png" />
            </ReactNavLink>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {HeaderItems.map(({ href, icon, text }) => (
              <NavLink key={href} icon={icon} href={href} text={text} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <ProfileImage userId={user.id} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/profile-page")}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => userContext.logOut()}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => navigate("/login")}>Log in</Button>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {HeaderItems.map((href, icon, text) => (
              <NavLink key={href} href={href} icon={icon} text={text} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
