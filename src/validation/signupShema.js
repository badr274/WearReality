import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

export default signupSchema;
