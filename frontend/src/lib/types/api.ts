/* eslint-disable @typescript-eslint/no-explicit-any */
export type KeywordsResponse = {
    keywords: string[]
}

export type CompetitorMappingApiResponse = {
    short_description?: string;
    title?: string;
    key_employee_change_list?: any[] | null;
    current_employees_summary?: any | null;
    funds_summary?: any | null;
    current_advisors_image_list?: any[] | null;
    org_funding_total?: any | null;
    org_num_investors?: number | null;
    org_similarity_list?: any[] | null;
    company_financials_highlights?: any | null;
    investors_list?: any[] | null;
}

export type CoordinateData = {
    coordinates: {
      lat: number;
      lng: number;
    };
    extracted_value: number;
    location: string;
    max_value_index: number;
    value: string;
  };
  
export type CoordinateDataApiResponse = CoordinateData[];