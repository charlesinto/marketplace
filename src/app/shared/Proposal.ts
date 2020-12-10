export interface Proposal {
  id?: number;
  timetodeliver: string;
  description: string;
  owner?: number;
  jobid?: number;
  proposedamount: string;
  date_created?: Date;
  updated_at?: Date;
  onwerfirstname?: string;
  status?: string;
  ownerlastname?: string;
  date_hired?: Date;
  date_completed?: Date;
  date_client_accepted?: Date;
  date_cancelled?: Date;
}
