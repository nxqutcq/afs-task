import { makeAutoObservable } from 'mobx';
import { Company, Photo } from '../types/company';

class CompanyStore {
  company: Company | null = null;
  error: string = '';
  token: string | null = null;
  photoLoading: boolean = false;
  detailsLoading: boolean = false;

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
    this.detailsLoading = true;
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
      this.detailsLoading = false;
    }
  }

  async updateCompany(
    updatedData: Partial<Company>,
    companyId: string,
    username: string
  ) {
    this.detailsLoading = true;
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
      this.detailsLoading = false;
    }
  }

  async addImage(file: File, companyId: string, username: string) {
    const tempId = `temp-${Date.now()}`;

    const optimisticImage: Photo = {
      name: tempId,
      thumbpath: URL.createObjectURL(file),
      filepath: '',
    };

    if (this.company) {
      this.company.photos.push(optimisticImage);
    }

    this.photoLoading = true;

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
        const index = this.company.photos.findIndex(
          (photo) => photo.name === tempId
        );
        if (index !== -1) {
          this.company.photos[index] = imageData;
        }
      }
    } catch (err: unknown) {
      if (this.company) {
        this.company.photos = this.company.photos.filter(
          (photo) => photo.name !== tempId
        );
      }
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = String(err);
      }
    } finally {
      this.photoLoading = false;
    }
  }

  async optimisticDeleteImage(
    imageName: string,
    companyId: string,
    username: string
  ) {
    if (this.company) {
      const backupPhotos = [...this.company.photos];
      this.company.photos = this.company.photos.filter(
        (photo) => photo.name !== imageName
      );
      this.photoLoading = true;

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
      } catch (err: unknown) {
        this.company.photos = backupPhotos;
        if (err instanceof Error) {
          this.error = err.message;
        } else {
          this.error = String(err);
        }
        throw err;
      } finally {
        this.photoLoading = false;
      }
    }
  }
}

export const companyStore = new CompanyStore();
