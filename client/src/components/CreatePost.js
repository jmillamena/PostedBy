import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { useAuth } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const CreatePostSchema = Yup.object().shape({
  friendId: Yup.string().required("Friend is required"),
  postContent: Yup.string().required("Post content is required"),
});

const CreatePost = () => {
  const { userId } = useAuth();
  const [friends, setFriends] = useState([]);

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
  }, [userId]);

  return (
    <div className="custom-create-post-form">
      <h2>Create Post</h2>
      <Formik
        initialValues={{
          friendId: "",
          postContent: "",
        }}
        validationSchema={CreatePostSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://127.0.0.1:5555/posts",
              {
                content_text: values.postContent,
                author_id: userId,
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

            // Reset the form and any other necessary logic
            setSubmitting(false);
          } catch (error) {
            console.error("Error creating post", error);

            // Handle the error, e.g., display an error message
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <FormLabel>Friend:</FormLabel>
              <Field
                as="select"
                id="friendId"
                name="friendId"
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
              <ErrorMessage name="friendId" component="div" />
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
