import { Box, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { Formik } from "formik";
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import { useCurrentUser } from "../../contexts/UserInfoContext";
import postShape from "../../shapes/post";
import { BUYING, SELLING } from "./constants";

const validationSchema = Yup.object({
  post_type: Yup.string()
    .required()
    .oneOf([SELLING, BUYING])
    .label("Type of post"),
  event: Yup.string().required().label("Event name"),
  price: Yup.number().optional(),
  description: Yup.string().label("Description"),
  location: Yup.string().required().label("Location"),
});

const initialValues = { post_type: SELLING };

function PostForm({ post, onSubmit }) {
  const user = useCurrentUser();
  const editingExisting = post !== null;

  const save = (values) => {
    if (editingExisting) return axios.put(`/posts/${post.id}/`, values);
    return axios.post("/posts/", { ...values, user: user.id });
  };
  return (
    <Formik
      onSubmit={(values, { setErrors }) =>
        save(values)
          .then((response) => {
            onSubmit(response.data);
          })
          // If something goes wrong, set form errors
          .catch((error) => setErrors(error.response.data))
      }
      initialValues={{ ...initialValues, ...post }}
      validationSchema={validationSchema}
    >
      {(formProps) => {
        const sellOrBuy =
          formProps.values.post_type === BUYING ? "buy" : "sell";
        const potentialBuyersOrSellers =
          formProps.values.post_type === BUYING
            ? "potential sellers"
            : "potential buyers";

        return (
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form"
            onSubmit={formProps.handleSubmit}
            background="#fff"
          >
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading>
                  {editingExisting ? "Edit post" : "Create a post"}
                </Heading>
              </Box>
              <Box>
                <InputControl
                  required
                  name="event"
                  label="Event"
                  helperText="The name of the event you are selling or buying a ticket for."
                />
              </Box>
              <Box>
                <InputControl
                  required
                  name="location"
                  label="Location"
                  helperText="Where is the event?"
                />
              </Box>
              <Box>
                <SelectControl
                  name="post_type"
                  required
                  label="Buying or selling?"
                  helperText={`If you want to sell a ticket, select 'Selling', otherwise, select 'Buying'.`}
                >
                  <option value={SELLING}>Selling</option>
                  <option value={BUYING}>Buying</option>
                </SelectControl>
              </Box>
              <Box>
                <InputControl
                  name="price"
                  label="Price"
                  helperText={`The price you are willing to ${sellOrBuy} for.`}
                  inputProps={{ type: "number" }}
                />
              </Box>
              <Box>
                <TextareaControl
                  name="description"
                  label="Description"
                  helperText={`Any other info you want ${potentialBuyersOrSellers} to see.`}
                />
              </Box>
              <Box textAlign="right">
                <SubmitButton
                  isLoading={formProps.isSubmitting}
                  isDisabled={!formProps.isValid || !formProps.dirty}
                >
                  {editingExisting ? "Update" : "Create"} post
                </SubmitButton>
              </Box>
            </VStack>
          </Box>
        );
      }}
    </Formik>
  );
}

PostForm.propTypes = {
  post: PropTypes.oneOf([null, postShape]),
  onSubmit: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  post: null,
};

export default PostForm;
