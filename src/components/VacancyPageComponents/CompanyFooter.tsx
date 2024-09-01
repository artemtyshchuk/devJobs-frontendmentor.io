import styles from "./VacancyPage.module.scss";
import { motion } from "framer-motion";

interface CompanyFooterProps {
  apply?: string;
  position?: string;
}

export const CompanyFooter = ({ apply, position }: CompanyFooterProps) => {
  const mobileScreen = window.matchMedia("(max-width: 576px)").matches;

  return (
    <div className={styles.companyFooter}>
      <div className={styles.companyFooter_content}>
        <div>
          <p
            className={styles.vacancyDescription_title}
            style={{ margin: "0", display: mobileScreen ? "none" : "block" }}
          >
            {position}
          </p>
          <p
            className={styles.vacancyDescription_description}
            style={{
              margin: "0",
              paddingTop: "12px",
              display: mobileScreen ? "none" : "block",
            }}
          >
            So Digital Inc.
          </p>
        </div>
        <div className={styles.companyFooter_applyButton}>
          <a href={apply}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={styles.vacancyDescription_button}
              style={{ marginRight: mobileScreen ? "0" : "46px" }}
            >
              Apply Now
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};
