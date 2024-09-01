import styles from "./SearchField.module.scss";
import { createPortal } from "react-dom";
import { ReactComponent as IconLocation } from "assets/desktop/icon-location.svg";
import { ReactComponent as IconCheck } from "assets/desktop/icon-check.svg";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { closeFiltersModal } from "reduxFolder/searchField-slice";
import { useForm } from "react-hook-form";
import { SearchFieldTypes } from "types";
import { motion } from "framer-motion";
import {
  setContractTypeCheckbox,
  setModalData,
  Vacancy,
} from "reduxFolder/checkBox-slice";
import { ContractType } from "reduxFolder/checkBox-slice";

export const SearchFieldModal = () => {
  const dispatch = useAppDispatch();
  const filtersModal = useAppSelector((state) => state.filtersModal);
  const dataContactType = useAppSelector(
    (state) => state.searchField.contractType
  );

  const { register, handleSubmit } = useForm<SearchFieldTypes>({
    mode: "onSubmit",
  });

  const handleCheckboxChange = () => {
    const checkboxValue: ContractType =
      dataContactType === "non-checked" ? "checked" : "non-checked";
    dispatch(setContractTypeCheckbox(checkboxValue));
  };

  const onSubmitModalForm = (dataFromModalInput: Vacancy) => {
    dispatch(setModalData(dataFromModalInput));
    dispatch(closeFiltersModal(filtersModal === "open" ? "close" : "open"));
  };

  const modalAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return createPortal(
    <motion.form
      className={styles.modal_SearchFieldModal}
      onSubmit={handleSubmit(onSubmitModalForm)}
      initial="hidden"
      animate="visible"
      variants={modalAnimation}
    >
      <div className={styles.modal_SearchFieldModalConteiner}>
        <div className={styles.modal_searchFieldInputWrapper}>
          <label className={styles.modal_searchFieldLabel}>
            <IconLocation />
          </label>
          <input
            type="text"
            {...register("searchByLocation")}
            autoComplete="off"
            className={styles.modal_searchFieldInput}
            placeholder="Filter by location…"
          />
        </div>
        <div className={styles.modal_checkboxFieldInputWrapper}>
          <div
            className={`${styles.modal_searchFieldInputCheckboxIcon} ${
              dataContactType === "checked" &&
              styles.modal_searchFieldInputCheckboxIconChecked
            }`}
            onClick={handleCheckboxChange}
          >
            {dataContactType && <IconCheck />}
          </div>
          <label className={styles.modal_searchFieldCheckboxLabel}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={dataContactType === "checked"}
              onChange={handleCheckboxChange}
              className={styles.modal_searchFieldInputCheckboxInput}
            />
            Full Time Only
          </label>
        </div>
        <button type="submit" className={styles.modal_searchButton}>
          Search
        </button>
      </div>
    </motion.form>,
    document.getElementById("search-field-modal") as HTMLElement
  );
};
