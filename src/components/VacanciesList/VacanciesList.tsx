import { useEffect, useState } from "react";
import styles from "./VacanciesList.module.scss";
import { VacancyType } from "types";
import { VacancyComponent } from "components/VacancyComponent";

interface VacanciesListProps {}

export const VacanciesList = ({}: VacanciesListProps) => {
  const [vacanciesList, setVacanciesList] = useState<VacancyType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const fetchVacanciesList = async () => {
    try {
      const response = await fetch("data.json");
      const dataJson = (await response.json()) as VacancyType[];
      setVacanciesList(dataJson);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleLoadMoreButton = () => {
    setVisibleCount((prevState) => prevState + 12);
  };

  useEffect(() => {
    fetchVacanciesList();
  }, []);

  return (
    <div className={styles.vacanciesList}>
      <div className={styles.vacanciesListContainer}>
        {vacanciesList.slice(0, visibleCount).map((vacancy) => (
          <VacancyComponent key={vacancy.id} {...vacancy} />
        ))}
      </div>
      {visibleCount < vacanciesList.length && (
        <div className={styles.loadMoreButtonWrapper}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMoreButton}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};
