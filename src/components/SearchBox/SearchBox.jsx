import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);

  const handleSearch = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.search}>
      <label className={css["search-label"]}>
        <span>Find contacts by name or phone:</span>
        <input className={css["search-input"]} type="text" placeholder="Enter your characters..." autoComplete="off" value={filterValue} onChange={handleSearch} />
      </label>
    </div>
  );
}
