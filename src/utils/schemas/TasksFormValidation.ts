import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Title is Required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 50 characters")
    .matches(
      /^[a-zA-Z0-9 .,\/\\]*$/,
      "Title cannot contain special characters."
    ),
  description: Yup.string()
    .trim()
    .required("Description is Required")
    .min(2, "Description must be at least 2 characters")
    .max(100, "Description must be at most 100 characters"),
  status: Yup.string().trim().required("Status is Required"),
});
