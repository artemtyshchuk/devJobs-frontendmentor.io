import { useEffect, useRef } from "react";
import styles from "./VacancyPage.module.scss";
import { motion } from "framer-motion";

interface VacancyDescriptionProps {
  postedAt?: string;
  contract?: string;
  location?: string;
  position?: string;
  apply?: string;
  description?: string;
  requirementsContent?: string;
  requirementsItems?: string[];
  roleContent?: string;
  roleItems?: string[];
  setFooterVisible: (visible: boolean) => void
}

export const VacancyDescription = ({
  apply,
  contract,
  description,
  location,
  position,
  postedAt,
  requirementsContent,
  requirementsItems,
  roleContent,
  roleItems,
  setFooterVisible
}: VacancyDescriptionProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    )
    if(buttonRef.current) {
      observer.observe(buttonRef.current)
    }

    return() => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    }

  }, [setFooterVisible])




  return (
    <div className={styles.vacancyDescription_container}>
      <div className={styles.vacancyDescription_header_wrapper}>
        <div>
          <div className={styles.vacancyDescription_header_subInfo}>
            <p className={styles.vacancyDescription_header_subInfo_text}>
              {postedAt}
            </p>
            <p className={styles.vacancyDescription_header_subInfo_text}>•</p>
            <p className={styles.vacancyDescription_header_subInfo_text}>
              {contract}
            </p>
          </div>
          <p className={styles.vacancyDescription_header_position}>
            {position}
          </p>
          <p className={styles.vacancyDescription_header_location}>
            {location}
          </p>
        </div>

        <div className={styles.vacancyDescription_buttonContainer} ref={buttonRef}>
          <a href={apply}>
            <motion.button
              className={styles.vacancyDescription_button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Apply Now
            </motion.button>
          </a>
        </div>
      </div>

      <p className={styles.vacancyDescription_description}>{description}</p>

      <p className={styles.vacancyDescription_title}>Requirements</p>
      <p className={styles.vacancyDescription_description}>
        {requirementsContent}
      </p>

      {requirementsItems?.map((item: string, index) => (
        <li
          key={index}
          className={styles.vacancyDescription_description_list}
          style={{ marginTop: "8px" }}
        >
          {item}
        </li>
      ))}

      <p className={styles.vacancyDescription_title}>What you will do</p>
      <p className={styles.vacancyDescription_description}>{roleContent}</p>
      {roleItems?.map((item, index) => (
        <li
          key={index}
          className={styles.vacancyDescription_description_list}
          style={{
            marginTop: "8px",
            listStyleType: "none",
            textIndent: "-30px",
          }}
        >
          <span className={styles.indexNumber}>{index + 1}.</span> {item}
        </li>
      ))}
    </div>
  );
};

