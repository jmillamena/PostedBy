// PostForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostFormSchema = Yup.object().shape({
  content_text: Yup.string(),
  contentImage: Yup.mixed().nullable(),
});

const PostForm = ({ onSubmit, authorId }) => {
  console.log("Author ID in PostForm:", authorId);

  if (authorId === undefined || authorId === null) {
    return <div>Error: Author ID is missing.</div>;
  }
  return (
    <Formik
      initialValues={{
        content_text: "",
        content_image: null,
        author_id: authorId,
      }}
      validationSchema={PostFormSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, handleBlur }) => (
        <Form encType="multipart/form-data">
          <div>
            <label htmlFor="content_text">Content:</label>
            <Field as="textarea" id="content_text" name="content_text" />
            <ErrorMessage name="content_text" component="div" />
          </div>
          <div>
            <label htmlFor="content_image">Image:</label>
            <Field
              type="file"
              id="content_image"
              name="content_image"
              onChange={(event) => {
                setFieldValue("content_image", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
            <ErrorMessage name="content_image" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
