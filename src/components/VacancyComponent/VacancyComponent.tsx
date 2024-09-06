import { VacancyType } from "types";
import styles from "./VacancyComponent.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface VacancyComponentProps extends VacancyType {}

export const VacancyComponent = (props: VacancyComponentProps) => {
  const {
    id,
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    contract,
    location,
  } = props;

  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleCardClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      navigate(`/section/${id}`);
    }, 350);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className={styles.vacancyComponent}
      variants={cardVariants}
      initial="visible"
      animate={!isExiting ? "visible" : "exit"}
      onClick={handleCardClick}
      data-testid="vacancyCard"
    >
      <div
        className={styles.logoBackground}
        style={{ backgroundColor: logoBackground }}
      >
        <img src={logo} alt="company logo" />
      </div>
      <div className={styles.vacancyComponent_header}>
        <p className={styles.headerText}>{postedAt}</p>
        <p className={styles.headerText}>•</p>
        <p className={styles.headerText}>{contract}</p>
      </div>
      <div className={styles.positionWrapper}>
        <div className={styles.position}>{position}</div>
      </div>
      <div className={styles.companyWrapper}>
        <p className={styles.company}>{company}</p>
      </div>
      <div className={styles.locationWrapper}>
        <p className={styles.location}>{location}</p>
      </div>
    </motion.div>
  );
};
