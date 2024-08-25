type GeneralFiltersTypes = {
  company?: string;
  position?: string;
  location?: string;
  description?: string;
  requirements?: {
    content: string;
    items: string[];
  };
};

type VacancyRequirements = {
  content: string;
  items: string[];
};

type VacancyRole = {
  content: string;
  items: string[];
};

export type SearchFieldTypes = {
  company?: GeneralFiltersTypes;
  location?: string;
  contract?: "Part Time" | "Full Time";
};

export type VacancyType = {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: VacancyRequirements;
  role: VacancyRole;
};
