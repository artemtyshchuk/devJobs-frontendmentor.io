import styles from "./SearchField.module.scss";
import { createPortal } from "react-dom";
import { ReactComponent as IconLocation } from "assets/desktop/icon-location.svg";
import { ReactComponent as IconCheck } from "assets/desktop/icon-check.svg";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { closeFiltersModal } from "reduxFolder/searchField-slice";

export const SearchFieldModal = () => {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const filtersModal = useAppSelector((state) => state.filtersModal);

  const handleSearchButton = () => {
    dispatch(closeFiltersModal(filtersModal === "open" ? "close" : "open"));
  };

  return createPortal(
    <div className={styles.modal_SearchFieldModal}>
      <div className={styles.modal_SearchFieldModalConteiner}>
        <div className={styles.modal_searchFieldInputWrapper}>
          <label className={styles.modal_searchFieldLabel}>
            <IconLocation />
          </label>
          <input
            type="text"
            name="searchByLocation"
            autoComplete="off"
            className={styles.modal_searchFieldInput}
            placeholder="Filter by location…"
          />
        </div>
        <div className={styles.modal_checkboxFieldInputWrapper}>
          <div
            className={`${styles.modal_searchFieldInputCheckboxIcon} ${
              checkbox && styles.modal_searchFieldInputCheckboxIconChecked
            }`}
            onClick={() => setCheckbox((prevState) => !prevState)}
          >
            {checkbox && <IconCheck />}
          </div>
          <label className={styles.modal_searchFieldCheckboxLabel}>
            <input
              type="checkbox"
              checked={checkbox}
              name="fullTimeCheckbox"
              onChange={() => setCheckbox((prevState) => !prevState)}
              className={styles.modal_searchFieldInputCheckboxInput}
            />
            Full Time Only
          </label>
        </div>
        <button
          type="submit"
          className={styles.modal_searchButton}
          onClick={handleSearchButton}
        >
          Search
        </button>
      </div>
    </div>,
    document.getElementById("search-field-modal") as HTMLElement
  );
};
