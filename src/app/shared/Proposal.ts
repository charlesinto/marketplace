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
}
