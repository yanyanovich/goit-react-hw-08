import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

export default function AuthNav() {
  const classToggle = ({ isActive }) => clsx(css.link, isActive && css.active);
  return (
    <div className={css.links_wrap}>
      <NavLink to="/login" className={classToggle}>
        Login
      </NavLink>
      <NavLink to="/register" className={classToggle}>
        Sign Up
      </NavLink>
    </div>
  );
}
