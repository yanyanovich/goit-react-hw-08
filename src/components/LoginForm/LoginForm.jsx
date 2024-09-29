import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import css from "../LoginForm/LoginForm.module.css";
import { selectError } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

export default function LoginForm() {
  const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const LoginSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegExp, "Email is not valid!").required("Required Email "),
    password: Yup.string().min(8, "Password Is Too Short!").max(30, "Password Is Too Long!").required("Required Password"),
  });

  const INITIAL_VALUES = { email: "", password: "" };
  const emailId = nanoid();
  const passwordId = nanoid();

  const dispatch = useDispatch();
  const handleSubmit = (values, action) => {
    dispatch(login(values))
      .unwrap()
      .then((data) => {
        toast.success(`Hello, ${data.user.name}!`);
      })
      .catch(() => {
        toast.error("Wrong login or password!");
      });
    action.resetForm();
  };
  //const error = useSelector(selectError);
  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit} validationSchema={LoginSchema}>
      {({ errors }) => (
        <Form className={css.form}>
          <label htmlFor={emailId} className={css.label}>
            Email
          </label>
          <Field className={css.input} type="text" name="email" id={emailId} placeholder="Enter your E-mail..." />
          <ErrorMessage className={css.errorText} name="email" component="span" />
          <label htmlFor={passwordId} className={css.label}>
            Password
          </label>
          <Field className={css.input} type="password" name="password" id={passwordId} placeholder="Enter your Password..." />
          <ErrorMessage className={css.errorText} name="password" component="span" />
          <button disabled={Object.keys(errors).length > 0} type="submit" className={css.button}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
