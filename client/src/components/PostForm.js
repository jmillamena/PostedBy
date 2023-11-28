// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   FormGroup,
//   FormLabel,
//   FormControl,
//   Button,
//   Alert,
// } from "react-bootstrap";

// const CreatePostSchema = Yup.object().shape({
//   recipientId: Yup.string().required("Recipient is required"),
//   postContent: Yup.string().required("Post content is required"),
//   postImage: Yup.string().url("Invalid URL"),
// });

// const PostForm = ({ onSubmit, friends }) => {
//   return (
//     <Formik
//       initialValues={{
//         recipientId: "",
//         postContent: "",
//         postImage: "",
//       }}
//       validationSchema={CreatePostSchema}
//       onSubmit={onSubmit}
//     >
//       {({ isSubmitting, resetForm }) => (
//         <Form>
//           <FormGroup>
//             <FormLabel>Recipient:</FormLabel>
//             <Field
//               as="select"
//               id="recipientId"
//               name="recipientId"
//               className="custom-form-control"
//             >
//               <option value="" disabled>
//                 Select a friend
//               </option>
//               {friends.map((friend) => (
//                 <option key={friend.id} value={friend.id}>
//                   {friend.username}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage name="recipientId" component="div" />
//           </FormGroup>
//           <FormGroup>
//             <FormLabel>Post Content:</FormLabel>
//             <Field
//               as={FormControl}
//               type="text"
//               id="postContent"
//               name="postContent"
//               className="custom-form-control"
//             />
//             <ErrorMessage name="postContent" component="div" />
//           </FormGroup>
//           <FormGroup>
//             <FormLabel>Post Image URL:</FormLabel>
//             <Field
//               as={FormControl}
//               type="text"
//               id="postImage"
//               name="postImage"
//               className="custom-form-control"
//             />
//             <ErrorMessage name="postImage" component="div" />
//           </FormGroup>
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="custom-submit-button"
//           >
//             Create Post
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default PostForm;

//edit to autorecipient

// PostForm.js
// PostForm.js
// PostForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";

const CreatePostSchema = Yup.object().shape({
  recipientId: Yup.string().required("Recipient is required"),
  postContent: Yup.string().required("Post content is required"),
  postImage: Yup.string().url("Invalid URL"),
});

const PostForm = ({ onSubmit, friends, initialRecipientId }) => {
  return (
    <Formik
      initialValues={{
        recipientId: initialRecipientId || "",
        postContent: "",
        postImage: "",
      }}
      validationSchema={CreatePostSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
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
  );
};

export default PostForm;
