import { useState } from "react";
import styles from "./VacanciesList.module.scss";
import { VacancyComponent } from "components/VacancyComponent";
import { useFetch } from "hooks/useFetch";

interface VacanciesListProps {}

export const VacanciesList = ({}: VacanciesListProps) => {
  const { data: vacanciesList } = useFetch();
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const handleLoadMoreButton = () => {
    setVisibleCount((prevState) => prevState + 12);
  };

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
