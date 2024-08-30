import styles from "./VacancyPage.module.scss";

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
}: VacancyDescriptionProps) => {
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

        <div className={styles.vacancyDescription_buttonContainer}>
          <a href={apply}>
            <button className={styles.vacancyDescription_button}>
              Apply Now
            </button>
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
