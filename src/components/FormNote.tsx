import { Box, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";

const FormNote = () => {
  return (
    <Formik
      initialValues={{ title: "", password: "" }}
      // validate={(values) => {
      //   const errors = {};
      //   if (!values.title) {
      //     errors.title = "Required";
      //   } else if (
      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.title)
      //   ) {
      //     errors.title = "Invalid email address";
      //   }
      //   return errors;
      // }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Box
          component={Form}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <Field
            as={TextField}
            label="title"
            variant="standard"
            type="text"
            name="title"
          />

          <ErrorMessage name="email" component="div" />
          <Field
            as={TextField}
            label="content"
            variant="standard"
            type="text"
            name="content"
          />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Box>
      )}
    </Formik>
  );
};

export default FormNote;
