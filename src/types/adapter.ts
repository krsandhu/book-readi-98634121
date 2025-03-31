
export interface Adapter {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  active: boolean;
  createdAt: string;
  url?: string;
  username?: string;
  password?: string;
  token?: string;
}

export interface AdapterFormData {
  name: string;
  description: string;
  apiKey: string;
  url?: string;
  username?: string;
  password?: string;
  token?: string;
}

export interface IntegrationRequest {
  platform: string;
  description?: string;
  email: string;
}
