// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   FormGroup,
//   FormLabel,
//   FormControl,
//   Button,
//   Dropdown,
// } from "react-bootstrap";
// import { useAuth } from "./App";

// import "bootstrap/dist/css/bootstrap.min.css";

// alert for success
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { useAuth } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const CreatePostSchema = Yup.object().shape({
  recipientId: Yup.string().required("Recipient is required"),
  postContent: Yup.string().required("Post content is required"),
  postImage: Yup.string().url("Invalid URL"),
});

const CreatePost = () => {
  const { userId } = useAuth();
  const [friends, setFriends] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the user's friends and update the state
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5555/users/${userId}/friends`
        );
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends", error);
      }
    };

    fetchFriends();

    console.log("UserId:", userId);
  }, [userId]);

  return (
    <div className="custom-create-post-form">
      <h2>Create Post</h2>
      <Formik
        initialValues={{
          recipientId: "",
          postContent: "",
          postImage: "",
        }}
        validationSchema={CreatePostSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            console.log("UserId in onSubmit:", userId);
            console.log("Form Values:", values);
            const response = await axios.post(
              "http://127.0.0.1:5555/posts",
              {
                content_text: values.postContent,
                author_id: userId,
                recipient_id: values.recipientId,
                content_image: values.postImage,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            );

            // Handle the response as needed, e.g., display a success message
            console.log("Post created successfully", response.data);

            // Reset the form and display success message
            resetForm();
            setSuccessMessage("Post created successfully");
            setErrorMessage(""); // Clear any previous error message

            // Remove success message after a few seconds
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);

            setSubmitting(false);
          } catch (error) {
            console.error("Error creating post", error);

            // Handle the error, e.g., display an error message
            setErrorMessage("Error creating post. Please try again.");
            setSuccessMessage(""); // Clear any previous success message

            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <FormGroup>
              <FormLabel>Recipient:</FormLabel>
              <Field
                as="select"
                id="recipientId"
                name="recipientId"
                className="custom-form-control"
              >
                <option value="" disabled>
                  Select a friend
                </option>
                {friends.map((friend) => (
                  <option key={friend.id} value={friend.id}>
                    {friend.username}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="recipientId" component="div" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Post Content:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="postContent"
                name="postContent"
                className="custom-form-control"
              />
              <ErrorMessage name="postContent" component="div" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Post Image URL:</FormLabel>
              <Field
                as={FormControl}
                type="text"
                id="postImage"
                name="postImage"
                className="custom-form-control"
              />
              <ErrorMessage name="postImage" component="div" />
            </FormGroup>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="custom-submit-button"
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;
