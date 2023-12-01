import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import "./loginstyle.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5555/users", values);

      if (response.status === 201) {
        history.push("/login");
      } else {
        setFieldError("password", "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      setFieldError("password", "Registration error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-login-form">
      <h2>Register</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <FormLabel>Name:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="name"
                name="name"
                aria-describedby="name-help"
                className="custom-form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="email"
                name="email"
                aria-describedby="email-help"
                className="custom-form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Username:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="username"
                name="username"
                aria-describedby="username-help"
                className="custom-form-control"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password:</FormLabel>
              <Field
                as={FormControl}
                type="password"
                id="password"
                name="password"
                aria-describedby="password-help"
                className="custom-form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </FormGroup>
            <br />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="custom-submit-button"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
