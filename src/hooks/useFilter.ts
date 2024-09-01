import { useAppSelector } from "redux-hooks";
import { useFetch } from "./useFetch";
import { useMemo } from "react";

export const useFilter = () => {
  const { data: vacanciesList } = useFetch();

  const contractData = useAppSelector(
    (state) => state.searchField.contractType
  );
  const {
    searchByTitle: mainSearchByTitle,
    searchByLocation: mainSearchByLocation,
  } = useAppSelector((state) => state.searchField.filteredVacancies);
  const {
    searchByTitle: modalSearchByTitle,
    searchByLocation: modalSearchByLocation,
  } = useAppSelector(
    (state) => state.searchField.modalVacancies || {} 
  );

  const activeSearchByTitle = modalSearchByTitle || mainSearchByTitle;
  const activeSearchByLocation = modalSearchByLocation || mainSearchByLocation;

  const filteredVacanciesList = useMemo(() => {
    return vacanciesList.filter((vacancy) => {
      const matchesContractType =
        contractData === "non-checked" || vacancy.contract === "Full Time";
      const matchesTitle = activeSearchByTitle
        ? [vacancy.company, vacancy.position, vacancy.description].some(
            (field) =>
              field.toLowerCase().includes(activeSearchByTitle.toLowerCase())
          )
        : true;
      const matchesLocation = activeSearchByLocation
        ? vacancy.location
            .toLowerCase()
            .includes(activeSearchByLocation.toLowerCase())
        : true;

      return matchesContractType && matchesTitle && matchesLocation;
    });
  }, [
    vacanciesList,
    contractData,
    activeSearchByTitle,
    activeSearchByLocation,
  ]);

  return { vacanciesList: filteredVacanciesList };
};
