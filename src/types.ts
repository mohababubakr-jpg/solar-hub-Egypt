export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  settings: {
    theme: 'light' | 'dark';
    preferredRegion?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RoiCalculation {
  id?: string;
  userId: string;
  monthlyBill: number;
  roofSpace: number;
  estimatedAnnualSavings: number;
  paybackPeriod: number;
  systemSize: number;
  createdAt: string;
}

export interface QuotationRequest {
  id?: string;
  userId: string;
  productId: string;
  companyName: string;
  contactPhone: string;
  notes?: string;
  status: 'pending' | 'contacted' | 'closed';
  createdAt: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}
