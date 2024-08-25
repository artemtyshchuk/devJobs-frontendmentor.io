import styles from "./SearchField.module.scss";
import { ReactComponent as IconSearch } from "assets/desktop/icon-search.svg";
import { ReactComponent as IconLocation } from "assets/desktop/icon-location.svg";
import { ReactComponent as IconCheck } from "assets/desktop/icon-check.svg";
import { ReactComponent as IconFilter } from "assets/mobile/icon-filter.svg";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { openFiltersModal } from "reduxFolder/searchField-slice";
import { SearchFieldModal } from "./SearchFieldModal";

interface SearchFieldProps {}

export const SearchField = ({}: SearchFieldProps) => {
  const hugeTabletScreen = window.matchMedia("(max-width: 1200px)").matches;
  const tabletScreen = window.matchMedia("(max-width: 992px)").matches;
  const mobileScreen = window.matchMedia("(max-width: 768px)").matches;
  const smallMobileScreen = window.matchMedia("(max-width: 576px)").matches;

  const [checkbox, setCheckbox] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const filtersModal = useAppSelector((state) => state.filtersModal);

  const handleFilterIconClick = () => {
    dispatch(openFiltersModal(filtersModal === "close" ? "open" : "close"));
  };

  return (
    <form className={styles.searchField} data-testid="searchField">
      <div className={styles.searchFieldInputWrapper}>
        <label className={styles.searchFieldLabel}>
          {smallMobileScreen ? null : <IconSearch />}
          <input
            type="text"
            name="searchByTitle"
            autoComplete="off"
            className={styles.searchFieldInput}
            placeholder={
              tabletScreen
                ? "Filter by title..."
                : "Filter by title, companies, expertise or benefits"
            }
          />
        </label>
      </div>
      {smallMobileScreen ? null : (
        <div className={styles.searchFieldInputWrapper}>
          <label className={styles.searchFieldLabel}>
            <IconLocation />
            <input
              type="text"
              autoComplete="off"
              name="searchByLocation"
              className={styles.searchFieldInput}
              placeholder="Filter by location…"
            />
          </label>
        </div>
      )}
      <div className={styles.checkboxContainer}>
        {mobileScreen ? (
          <IconFilter
            className={styles.iconFilter}
            onClick={handleFilterIconClick}
          />
        ) : (
          <>
            <div
              className={`${styles.searchFieldInputCheckboxIcon} ${
                checkbox && styles.searchFieldInputCheckboxIconChecked
              }`}
              onClick={() => setCheckbox((prevState) => !prevState)}
            >
              {checkbox && <IconCheck />}
            </div>
            <label className={styles.searchFieldCheckboxLabel}>
              <input
                type="checkbox"
                checked={checkbox}
                autoComplete="off"
                name="fullTimeCheckbox"
                onChange={() => setCheckbox((prevState) => !prevState)}
                className={styles.searchFieldInputCheckboxInput}
              />
              {hugeTabletScreen ? "Full Time" : "Full Time Only"}
            </label>
          </>
        )}

        <button type="submit" className={styles.searchButton}>
          {smallMobileScreen ? (
            <IconSearch className={styles.searchButtonIconSearch} />
          ) : (
            "Search"
          )}
        </button>
      </div>
      {filtersModal === "open" && <SearchFieldModal />}
    </form>
  );
};
