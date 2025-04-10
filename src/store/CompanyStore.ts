import { makeAutoObservable } from 'mobx';
import { Company } from '../types/company';

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

  async addImage(file: File, companyId: string, username: string) {
    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `https://test-task-api.allfuneral.com/companies/${companyId}/image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add image');
      }

      const imageData = await response.json();

      if (this.company) {
        this.company.photos.push(imageData);
      }
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

  async deleteImage(imageName: string, companyId: string, username: string) {
    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const response = await fetch(
        `https://test-task-api.allfuneral.com/companies/${companyId}/image/${imageName}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      if (this.company) {
        this.company.photos = this.company.photos.filter(
          (photo) => photo.name !== imageName
        );
      }
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
