export interface Service {
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
  showAttachment?: number;
  country?: string;
  address?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
}
