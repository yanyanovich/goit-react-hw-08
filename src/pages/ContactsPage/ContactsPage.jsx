import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectIsLoading } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";
import { Loader } from "../../components/Loader";
import toast from "react-hot-toast";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <div className={css.loader}>
          <p className={css.text}>Request in progress...</p>
          <Loader />
        </div>
      )}
      <h1 className={css.title}>Phonebook</h1>
      <div className={css.form_wrapper}>
        <ContactForm />
        <SearchBox />
      </div>
      {contacts.length > 0 ? <ContactList /> : <p className={css.message}>You don't have any contacts yet!🙅🏽‍♂️</p>}
    </>
  );
}
