export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string;
  companyDepartment?: string;
  companyEmployeeRange?: string;
  active?: number;
  type?: string;
  updated_at?: Date;
  verifed_at?: Date;
}
