import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

const LoginSchema = Yup.object().shape({
  identifier: Yup.string().required("Email or Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ setIsLoggedIn, setUserName, setUserId }) => {
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5555/login", values);

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("user_id", response.data.user_id);

        setIsLoggedIn(true);
        setUserName(response.data.user_name);
        setUserId(response.data.user_id);

        // Redirect to the dashboard
        history.push("/dashboard");
      } else {
        setFieldError("password", "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      setFieldError("password", "Login error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          identifier: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <FormLabel>Email or Username:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="identifier"
                name="identifier"
              />
              <ErrorMessage name="identifier" component="div" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password:</FormLabel>
              <Field
                as={FormControl}
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
              />
              <ErrorMessage name="password" component="div" />
            </FormGroup>
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
