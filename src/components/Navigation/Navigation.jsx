import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const classToggle = ({ isActive }) => clsx(css.link, isActive && css.active);

  return (
    <nav className={css.wraper}>
      <NavLink to="/" className={classToggle}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={classToggle}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
