import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../contexts/UserInfoContext";

const validationSchema = Yup.object({
  email: Yup.string().required().email("Email is not valid").label("Email"),
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().required().label("Last name"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both passwords need to be the same"
    ),
  }),
});

function RegisterUser() {
  const navigate = useNavigate();
  const userContext = useUserInfoContext();
  return (
    <Center width="100%" height="100vh">
      <Container>
        <Container paddingTop="1em">
          <Formik
            onSubmit={(values, { setErrors }) =>
              // Post to /users/ to create a new user
              axios
                .post("/users/", values)
                .then(() =>
                  // Automatically log in the new user
                  userContext
                    .logIn(values.email, values.password)
                    // After attempted login, navigate to main page
                    .finally(() => navigate("/"))
                )
                // If something goes wrong with the registration, set form errors so user can fix it
                .catch((error) => setErrors(error.response.data))
            }
            initialValues={{}}
            validationSchema={validationSchema}
          >
            {(formProps) => (
              <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form"
                onSubmit={formProps.handleSubmit}
              >
                <VStack spacing={5} align="stretch">
                  <Box>
                    <Heading>Register</Heading>
                  </Box>
                  <Box>
                    <Heading size={5}>
                      Please enter email and password to create a user.
                    </Heading>
                  </Box>
                  <Box>
                    <InputControl
                      type="email"
                      name="email"
                      placeholder="ola.nordmann@example.com"
                      required
                      label="Email address"
                      data-testid="email-input"
                    />
                  </Box>
                  <HStack justifyContent="space-between" w="100%">
                    <Box>
                      <InputControl
                        type="text"
                        name="first_name"
                        placeholder="Ola"
                        required
                        label="First name"
                        data-testid="firstname-input"
                      />
                    </Box>
                    <Box>
                      <InputControl
                        type="text"
                        name="last_name"
                        placeholder="Nordmann"
                        required
                        label="Last name"
                        data-testid="lastname-input"
                      />
                    </Box>
                  </HStack>
                  <Box>
                    <InputControl
                      required
                      name="password"
                      label="Password"
                      data-testid="password-input"
                      inputProps={{
                        type: "password",
                        autoComplete: "new-password",
                        placeholder: "• • • • • • • •",
                      }}
                      helperText="Create a new password."
                    />
                  </Box>
                  <Box>
                    <InputControl
                      required
                      name="confirmPassword"
                      data-testid="confirmPassword-input"
                      inputProps={{
                        type: "password",
                        autoComplete: "new-password",
                        placeholder: "• • • • • • • •",
                      }}
                      helperText="Repeat your password."
                    />
                  </Box>
                  <Box textAlign="right">
                    <SubmitButton
                      isLoading={formProps.isSubmitting}
                      isDisabled={!formProps.isValid}
                      style={{ backgroundColor: "#87A8A4", color: "#FFFFFF" }}
                    >
                      Register user
                    </SubmitButton>
                  </Box>
                </VStack>
              </Box>
            )}
          </Formik>
        </Container>
      </Container>
    </Center>
  );
}

export default RegisterUser;
