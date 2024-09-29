import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  return (
    <>
      <h2 className={css.title}>Registration Page</h2>
      <RegistrationForm />
    </>
  );
}
