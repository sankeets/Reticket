import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Header from "../../components/Header";
import AddPostPage from "./AddPostPage";
import FeedPage from "./FeedPage";

function HomePage() {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      background-color="#F5F5F3"
    >
      <Header />
      <Routes>
        <Route path="profile-page" element={<ProfilePage />} />
        <Route path="create-post" element={<AddPostPage />} />
        <Route path="" element={<FeedPage />} />
      </Routes>
    </Box>
  );
}

export default HomePage;
