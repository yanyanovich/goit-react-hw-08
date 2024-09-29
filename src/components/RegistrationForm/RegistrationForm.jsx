import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "../RegistrationForm/RegistrationForm.module.css";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name Is Too Short!").max(50, "Name Is Too Long!").required("Required Name"),
    email: Yup.string().matches(emailRegExp, "Email is not valid!").required("Required Email "),
    password: Yup.string().min(8, "Password must be 8 characters min!").max(30, "Password must be 30 characters max!").required("Required Password"),
  });

  const INITIAL_VALUES = { name: "", email: "", password: "" };
  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();

  const dispatch = useDispatch();
  const handleSubmit = (values, action) => {
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        toast.success(`${data.user.name} is successfully registered!`);
      })
      .catch(() => {
        toast.error("Email is already registered!");
      });
    action.resetForm();
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit} validationSchema={RegistrationSchema}>
      {({ errors }) => (
        <Form className={css.form}>
          <label htmlFor={nameId} className={css.label}>
            Name
          </label>
          <Field className={css.input} type="text" name="name" id={nameId} placeholder="Enter your Name..." autoComplete="off" />
          <ErrorMessage className={css.errorText} name="name" component="span" />
          <label htmlFor={emailId} className={css.label}>
            Email
          </label>
          <Field className={css.input} type="text" name="email" id={emailId} placeholder="Enter your E-mail..." autoComplete="off" />
          <ErrorMessage className={css.errorText} name="email" component="span" />
          <label htmlFor={passwordId} className={css.label}>
            Password
          </label>
          <Field className={css.input} type="password" name="password" id={passwordId} placeholder="Enter your Password..." autoComplete="off" />
          <ErrorMessage className={css.errorText} name="password" component="span" />
          <button disabled={Object.keys(errors).length > 0} type="submit" className={css.button}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}
