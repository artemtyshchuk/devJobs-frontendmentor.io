import { useState } from "react";
import styles from "./VacanciesList.module.scss";
import { VacancyComponent } from "components/VacancyComponent";
import { useFilter } from "hooks/useFilter";
import { motion, AnimatePresence } from "framer-motion";

export const VacanciesList = () => {
  const { vacanciesList } = useFilter();
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const handleLoadMoreButton = () => {
    setVisibleCount((prevState) => prevState + 12);
  };

  const noVacanciesAnimation = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const listVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={styles.vacanciesList}>
      <div className={styles.vacanciesListContainer}>
        <AnimatePresence>
          {vacanciesList.length > 0 ? (
            vacanciesList.slice(0, visibleCount).map((vacancy) => (
              <motion.div
                key={vacancy.id}
                variants={listVariants}
                initial="hidden"
                exit="hidden"
                animate="visible"
              >
                <VacancyComponent {...vacancy} />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={noVacanciesAnimation}
              initial="hidden"
              animate="visible"
            >
              <h1
                style={{
                  color: "#5964e0",
                  margin: 0,
                  fontFamily: "Kumbh Sans",
                }}
              >
                No vacancies found
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {visibleCount < vacanciesList.length && (
        <div className={styles.loadMoreButtonWrapper}>
          <motion.button
            className={styles.loadMoreButton}
            onClick={handleLoadMoreButton}
            whileHover={{ scale: 1.1 }}
          >
            Load more
          </motion.button>
        </div>
      )}
    </div>
  );
};
