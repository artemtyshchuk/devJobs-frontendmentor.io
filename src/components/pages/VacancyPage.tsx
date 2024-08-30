import styles from "../VacancyPageComponents/VacancyPage.module.scss";
import { VacancyType } from "types";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CompanyHeader } from "../VacancyPageComponents/CompanyHeader";
import { VacancyDescription } from "components/VacancyPageComponents/VacancyDescription";
import { CompanyFooter } from "components/VacancyPageComponents/CompanyFooter";

export const VacancyPage = () => {
  const [vacancy, setVacancy] = useState<VacancyType>();
  const params = useParams<{ vacancyId: string }>();

  const fetchVacancyData = async () => {
    try {
      const res = await fetch("/data.json");
      const dataJson = (await res.json()) as VacancyType[];
      const vacancyId = Number(params.vacancyId);
      const currentJobPage = dataJson.find(
        (vacancyData) => vacancyData.id === vacancyId
      );
      setVacancy(currentJobPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchVacancyData();
  }, [params.vacancyId]);

  return (
    <div className={styles.vacancyPage}>
      <CompanyHeader
        company={vacancy?.company}
        website={vacancy?.website}
        logo={vacancy?.logo}
        logoBackground={vacancy?.logoBackground}
      />
      <VacancyDescription
        apply={vacancy?.apply}
        contract={vacancy?.contract}
        description={vacancy?.description}
        location={vacancy?.location}
        position={vacancy?.position}
        postedAt={vacancy?.postedAt}
        requirementsContent={vacancy?.requirements.content}
        requirementsItems={vacancy?.requirements.items}
        roleContent={vacancy?.role.content}
        roleItems={vacancy?.role.items}
      />
      <CompanyFooter apply={vacancy?.apply} position={vacancy?.position} />
    </div>
  );
};
