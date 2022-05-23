import { SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { FeedContext } from "./FeedContext";
import Post from "./Post";

/**
 *
 * @param type Type is either SELLING or BYUING
 * @returns Returns a react element
 */
function Feed({ type, user }) {
  // This state is used to store posts
  const [posts, setPosts] = React.useState(undefined);
  const [searchTerm, setSearchTerm] = React.useState("");
  // This useEffect is responsible for fetching posts from the backend when the page loads
  React.useEffect(
    function getPosts() {
      axios
        .get(`/posts/?post_type=${type}&user=${user ?? ""}`)
        .then((response) => setPosts(response.data));
    },
    [type, user]
  );
  // This function can be used to update a post in the posts state.
  // It is also passed to the FeedContext below, so that all sub components in the feed can call the function.
  const onPostUpdate = React.useCallback((updatedValues) => {
    setPosts((previousState) =>
      previousState.map((post) => {
        if (post.id === updatedValues.id) return updatedValues;
        return post;
      })
    );
  }, []);
  /**
   * This function can be used to delete a post, and it also updates the posts state.
   * It is also passed to the FeedContext below, so that all sub components in the feed can call the function.
   * It takes in the ID of the post (a number).
   */
  const onPostDelete = React.useCallback((postId) => {
    axios
      .delete(`/posts/${postId}/`)
      .then(() =>
        setPosts((previousState) =>
          previousState.filter((post) => post.id !== postId)
        )
      );
  }, []);

  // filteredPosts is a variable that contains the posts in the state filtered based on the search term.
  // The useMemo function ensures that we only regenerate this variable if the searchTerm or the posts state has changed.
  const filteredPosts = React.useMemo(
    () =>
      posts?.filter(
        (post) =>
          post.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [posts, searchTerm]
  );
  const contextValue = React.useMemo(
    () => ({ posts, onPostUpdate, onPostDelete }),
    [posts, onPostUpdate, onPostDelete]
  );
  return (
    <Container overflowY="auto">
      {posts === undefined ? (
        "Loading..."
      ) : (
        <FeedContext.Provider value={contextValue}>
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <Input
                width="100%"
                align="center"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
              />
              <InputRightElement>
                <SearchIcon color="gray.400" />
              </InputRightElement>
            </InputGroup>
            {filteredPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </VStack>
        </FeedContext.Provider>
      )}
    </Container>
  );
}

Feed.propTypes = {
  type: PropTypes.oneOf(["BUYING", "SELLING"]).isRequired,
  user: PropTypes.oneOf([PropTypes.number, PropTypes.undefined]),
};

Feed.defaultProps = {
  user: undefined,
};

export default Feed;
