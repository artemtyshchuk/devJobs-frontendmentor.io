import styles from "components/VacancyPageComponents/VacancyPage.module.scss";
import { useNavigate, useParams } from "react-router";
import { CompanyHeader } from "components/VacancyPageComponents/CompanyHeader";
import { VacancyDescription } from "components/VacancyPageComponents/VacancyDescription";
import { CompanyFooter } from "components/VacancyPageComponents/CompanyFooter";
import { useFetch } from "hooks/useFetch";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const VacancyPage = () => {
  const [footerVisible, setFooterVisible] = useState(false);

  const { data: vacancies } = useFetch();
  const params = useParams<{ vacancyId: string }>();

  const vacancy = vacancies.find(
    (vacancyData) => vacancyData.id === Number(params.vacancyId)
  );

  const navigate = useNavigate();

  if (!vacancy) {
    navigate("/not-found");
    return null;
  }

  const headerAnimation = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const descriptionAnimation = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  };

  const footerAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className={styles.vacancyPage}>
      <motion.div initial="hidden" animate="visible" variants={headerAnimation}>
        <CompanyHeader
          company={vacancy.company}
          website={vacancy.website}
          logo={vacancy.logo}
          logoBackground={vacancy.logoBackground}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={descriptionAnimation}
      >
        <VacancyDescription
          apply={vacancy.apply}
          contract={vacancy.contract}
          description={vacancy.description}
          location={vacancy.location}
          position={vacancy.position}
          postedAt={vacancy.postedAt}
          requirementsContent={vacancy.requirements.content}
          requirementsItems={vacancy.requirements.items}
          roleContent={vacancy.role.content}
          roleItems={vacancy.role.items}
          setFooterVisible={setFooterVisible}
        />
      </motion.div>

      <AnimatePresence>
        {footerVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={footerAnimation}
          >
            <CompanyFooter apply={vacancy.apply} position={vacancy.position} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
