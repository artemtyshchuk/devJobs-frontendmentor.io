import { VacancyType } from "types";
import styles from "./VacancyComponent.module.scss";

interface VacancyComponentProps extends VacancyType {}

export const VacancyComponent = (props: VacancyComponentProps) => {
  const {
    company,
    logo,
    logoBackground,
    position,
    postedAt,
    contract,
    location,
  } = props;

  return (
    <div className={styles.vacancyComponent}>
      <div
        className={styles.logoBackground}
        style={{ backgroundColor: logoBackground }}
      >
        <img src={logo} alt="comany logo" />
      </div>
      <div className={styles.vacancyComponent_header}>
        <p className={styles.headerText}>{postedAt}</p>
        <p className={styles.headerText}>•</p>
        <p className={styles.headerText}>{contract}</p>
      </div>
      <div className={styles.positionWrapper}>
        <p className={styles.position}>{position}</p>
      </div>
      <div className={styles.companyWrapper}>
        <p className={styles.company}>{company}</p>
      </div>
      <div className={styles.locationWrapper}>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  );
};
