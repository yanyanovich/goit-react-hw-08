import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectIsLoading } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then((data) => {
        toast.success(`Contact ${data.name} was deleted!`);
      });
  };

  return (
    <>
      <ul className={css["card-items"]}>
        <li className={css["card-item"]}>
          <FaUser />
          &nbsp;
          {name}
        </li>
        <li className={css["card-item"]}>
          <FaPhone />
          &nbsp;
          {number}
        </li>
      </ul>
      <button disabled={isLoading} type="button" className={css["card-btn"]} onClick={onDeleteContact}>
        Delete
      </button>
    </>
  );
}
