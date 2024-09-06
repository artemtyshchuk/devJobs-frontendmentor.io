import styles from "./VacancyPage.module.scss";

interface CompanyHeaderProps {
  logo?: string;
  logoBackground?: string;
  company?: string;
  website?: string;
}

export const CompanyHeader = ({
  logo,
  logoBackground,
  company,
  website,
}: CompanyHeaderProps) => {
  return (
    <div className={styles.companyHeader} data-testid="companyHeader">
      <div
        className={styles.companyHeader_logoContainer}
        style={{ backgroundColor: logoBackground }}
      >
        <img src={logo} alt="company logo" data-testid="companyLogo" />
      </div>
      <div className={styles.companyHeader_companyInfoContainer}>
        <p className={styles.companyHeader_companyName}>{company}</p>
        <p className={styles.companyHeader_companyWebsite}>{website}</p>
      </div>
      <div className={styles.companyHeader_companySiteContainer}>
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          data-testid="companyWebsite"
        >
          <button
            className={styles.companyHeader_companySiteButton}
            data-testid="headerButton"
          >
            Company Site
          </button>
        </a>
      </div>
    </div>
  );
};
