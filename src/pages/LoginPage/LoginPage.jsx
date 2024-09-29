import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2 className={css.title}>Login Page</h2>
      <LoginForm />
    </>
  );
}
