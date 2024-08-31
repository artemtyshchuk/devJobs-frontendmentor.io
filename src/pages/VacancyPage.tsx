import styles from "components/VacancyPageComponents/VacancyPage.module.scss";
import { useNavigate, useParams } from "react-router";
import { CompanyHeader } from "../components/VacancyPageComponents/CompanyHeader";
import { VacancyDescription } from "components/VacancyPageComponents/VacancyDescription";
import { CompanyFooter } from "components/VacancyPageComponents/CompanyFooter";
import { useFetch } from "hooks/useFetch";

export const VacancyPage = () => {
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

  return (
    <div className={styles.vacancyPage}>
      <CompanyHeader
        company={vacancy.company}
        website={vacancy.website}
        logo={vacancy.logo}
        logoBackground={vacancy.logoBackground}
      />
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
      />
      <CompanyFooter apply={vacancy.apply} position={vacancy.position} />
    </div>
  );
};
