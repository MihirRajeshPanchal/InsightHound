export type user = {
  email: string;
  password: string;
  id: string;
  props: string | null;
  companyId: string | null;
  createdAt: Date;
};

export interface Company {
  name: string;
  description: string;
  vision?: string;
  mission?: string;
  valuation?: string;
  domain?: string;
} 