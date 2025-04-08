import { makeAutoObservable } from 'mobx';

export interface Company {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

class CompanyStore {
  company: Company | null = null;
  loading: boolean = false;
  error: string = '';
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getAuthToken(username: string): Promise<string> {
    const response = await fetch(
      `https://test-task-api.allfuneral.com/auth?user=${username}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch auth token');
    }
    const authHeader = response.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid auth token format');
    }
    return authHeader.replace('Bearer ', '');
  }

  async ensureAuthToken(username: string): Promise<string> {
    if (!this.token) {
      this.token = await this.getAuthToken(username);
    }
    return this.token;
  }

  async fetchCompany(companyId: string, username: string) {
    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const response = await fetch(
        `https://test-task-api.allfuneral.com/companies/${companyId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch company');
      }
      this.company = await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = String(err);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateCompany(
    updatedData: Partial<Company>,
    companyId: string,
    username: string
  ) {
    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const response = await fetch(
        `https://test-task-api.allfuneral.com/companies/${companyId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update company');
      }
      this.company = await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = String(err);
      }
    } finally {
      this.loading = false;
    }
  }
}

export const companyStore = new CompanyStore();
