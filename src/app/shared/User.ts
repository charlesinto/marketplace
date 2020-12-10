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

export interface UserPersonalDetails {
  id?: number;
  gender?: string;
  hourly_rate?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  tag_line?: string;
  description?: string;
  profile_photo1_url?: string;
  profile_photo2_url?: string;
  profile_photo3_url?: string;
  banner_url?: string;
  country?: string;
  address?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  owner: number;
  date_created?: Date;
  updated_at?: Date;
}

export interface UserSkills {
  id?: number;
  skillname?: string;
  rating?: number;
  owner: number;
  date_created?: Date;
  updated_at?: Date;
}

export interface UserExperience {
  id?: number;
  company_title?: string;
  starting_date?: Date;
  job_title?: string;
  job_description?: string;
  ending_date?: Date;
  is_current?: number;
  date_created?: Date;
  owner: number;
  updated_at?: Date;
}

export interface UserEducation {
  id?: number;
  institution?: string;
  starting_date?: Date;
  title?: string;
  description?: string;
  ending_date?: Date;
  is_current?: number;
  date_created?: Date;
  owner: number;
  updated_at?: Date;
}

export interface UserProject {
  id?: number;
  project_title?: string;
  project_url?: string;
  project_photo1_url?: string;
  project_photo2_url?: string;
  project_photo3_url?: string;
  project_photo4_url?: string;
  owner: number;
  date_created: Date;
  updated_at: Date;
}

export interface UserAward {
  id?: number;
  award_title?: string;
  award_date?: Date;
  award_photo1_url?: string;
  award_photo2_url?: string;
  award_photo3_url?: string;
  owner: number;
  date_created: Date;
  updated_at: Date;
}

export interface UserCompleteDetails {
  personalDetail?: UserPersonalDetails;
  userSkills?: UserSkills[];
  userExperience?: UserExperience[];
  userEducation?: UserEducation[];
  userProject: UserProject[];
  userAward: UserAward[];
}
