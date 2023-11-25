// PostForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostFormSchema = Yup.object().shape({
  contentText: Yup.string(),
  contentImage: Yup.mixed().nullable(),
});

const PostForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        contentText: "",
        contentImage: null,
      }}
      validationSchema={PostFormSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form enctype="multipart/form-data">
          <div>
            <label htmlFor="contentText">Content:</label>
            <Field as="textarea" id="contentText" name="contentText" />
            <ErrorMessage name="contentText" component="div" />
          </div>
          <div>
            <label htmlFor="contentImage">Image:</label>
            <Field
              type="file"
              id="contentImage"
              name="contentImage"
              onChange={(event) => {
                setFieldValue("contentImage", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="contentImage" component="div" />
          </div>
          {/* Add other fields here */}
          <button type="submit" disabled={isSubmitting}>
            Create Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
