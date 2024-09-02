import styles from "./SearchField.module.scss";
import { ReactComponent as IconSearch } from "assets/desktop/icon-search.svg";
import { ReactComponent as IconLocation } from "assets/desktop/icon-location.svg";
import { ReactComponent as IconCheck } from "assets/desktop/icon-check.svg";
import { ReactComponent as IconFilter } from "assets/mobile/icon-filter.svg";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { openFiltersModal } from "reduxFolder/searchField-slice";
import { SearchFieldModal } from "./SearchFieldModal";
import { useForm } from "react-hook-form";
import { SearchFieldTypes } from "types";
import {
  ContractType,
  setContractTypeCheckbox,
  setFilteredVacancies,
  Vacancy,
} from "reduxFolder/checkBox-slice";
import { motion } from "framer-motion";

export const SearchField = () => {
  const hugeTabletScreen = window.matchMedia("(max-width: 1200px)").matches;
  const tabletScreen = window.matchMedia("(max-width: 992px)").matches;
  const mobileScreen = window.matchMedia("(max-width: 768px)").matches;
  const smallMobileScreen = window.matchMedia("(max-width: 576px)").matches;

  const dispatch = useAppDispatch();
  const filtersModal = useAppSelector((state) => state.filtersModal);
  const dataContractType = useAppSelector(
    (state) => state.searchField.contractType
  );

  const handleFilterIconClick = () => {
    dispatch(openFiltersModal(filtersModal === "close" ? "open" : "close"));
  };

  const handleCheckboxChange = () => {
    const checkboxValue: ContractType =
      dataContractType === "non-checked" ? "checked" : "non-checked";
    dispatch(setContractTypeCheckbox(checkboxValue));
  };

  const { register, handleSubmit } = useForm<SearchFieldTypes>({
    mode: "onSubmit",
  });

  const onSubmitForm = (dataFromInputs: Vacancy) => {
    dispatch(setFilteredVacancies(dataFromInputs));
  };

  return (
    <form
      className={styles.searchField}
      data-testid="searchField"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className={styles.searchFieldInputWrapper}>
        <label className={styles.searchFieldLabel}>
          {smallMobileScreen ? null : <IconSearch />}
          <input
            type="text"
            {...register("searchByTitle")}
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
              {...register("searchByLocation")}
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
                dataContractType === "checked" &&
                styles.searchFieldInputCheckboxIconChecked
              }`}
              onClick={handleCheckboxChange}
            >
              {dataContractType === "checked" && <IconCheck />}
            </div>
            <label className={styles.searchFieldCheckboxLabel}>
              <input
                type="checkbox"
                autoComplete="off"
                checked={dataContractType === "checked"}
                onChange={handleCheckboxChange}
                className={styles.searchFieldInputCheckboxInput}
              />
              {hugeTabletScreen ? "Full Time" : "Full Time Only"}
            </label>
          </>
        )}

        <motion.button
          type="submit"
          className={styles.searchButton}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {smallMobileScreen ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSearch className={styles.searchButtonIconSearch} />
            </div>
          ) : (
            "Search"
          )}
        </motion.button>
      </div>

      {filtersModal === "open" && <SearchFieldModal />}
    </form>
  );
};
