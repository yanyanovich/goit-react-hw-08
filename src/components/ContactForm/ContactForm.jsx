import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

export default function ContactForm() {
  const phoneRegExp = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

  const ContactSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name Is Too Short!").max(50, "Name Is Too Long!").required("Required Name"),
    number: Yup.string().matches(phoneRegExp, "Phone number is not valid!").required("Required Number"),
  });
  const INITIALS_VALUES = { name: "", number: "" };

  const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    const newContact = {
      ...values,
    };
    dispatch(addContact(newContact))
      .unwrap()
      .then((data) => {
        toast.success(`Contact ${data.name} added!`);
      });
    action.resetForm();
  };

  return (
    <Formik initialValues={INITIALS_VALUES} onSubmit={handleSubmit} validationSchema={ContactSchema}>
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name</span>
            <Field className={css.input} type="text" name="name" placeholder="Enter contact name..." autoComplete="off" required />
            <ErrorMessage className={css.errorText} name="name" component="span" />
          </label>

          <label className={css.label}>
            <span>Number</span>
            <Field className={css.input} type="tel" name="number" placeholder="Enter phone number as: xxx-xx-xx" autoComplete="off" required />
            <ErrorMessage className={css.errorText} name="number" component="span" />
          </label>

          <button disabled={Object.keys(errors).length > 0} className={css["form-btn"]} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
