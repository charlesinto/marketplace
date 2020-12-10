import { Proposal } from './Proposal';

export interface Job {
  id?: number;
  title: number;
  serviceLevel: number;
  type: number;
  duration: number;
  featured: number;
  details: number;
  status?: number;
  date_created?: Date;
  updated_at?: Date;
  owner?: number;
  categoryId: number;
  skills?: string[];
  showAttachment?: number;
}

export interface JobDetail {
  id?: number;
  title: number;
  serviceLevel: number;
  type: number;
  duration: number;
  featured: number;
  details: number;
  status?: number;
  date_created?: Date;
  updated_at?: Date;
  categoryname?: string;
  categorydescription?: string;
  owner?: number;
  categoryId: number;
  ownerFirstName?: string;
  ownerLastName?: string;
  showAttachment: number;
  jobSkills?: JobSkills[];
  proposals?: Proposal[];
  country?: string;
  address?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
}

export interface JobSkills {
  id?: number;
  jobid?: number;
  skill?: string;
  datecreated?: Date;
  updated_at?: Date;
}
