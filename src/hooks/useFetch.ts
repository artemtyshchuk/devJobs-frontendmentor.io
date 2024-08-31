import { useEffect, useState } from "react";
import { VacancyType } from "types";

export const useFetch = () => {
  const [data, setData] = useState<VacancyType[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const dataJson = (await response.json()) as VacancyType[];
      setData(dataJson);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData };
};
