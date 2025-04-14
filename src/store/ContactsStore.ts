import { makeAutoObservable } from 'mobx';
import { Contacts } from '../types/contacts';

class ContactsStore {
  contacts: Contacts | null = null;
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

  async fetchContact(contactId: string, username: string) {
    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const response = await fetch(
        `https://test-task-api.allfuneral.com/contacts/${contactId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }
      this.contacts = await response.json();
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

  async updateContacts(
    updatedData: Partial<Contacts>,
    contactId: string,
    username: string
  ) {
    const backupContacts = this.contacts ? { ...this.contacts } : null;

    if (this.contacts) {
      this.contacts = { ...this.contacts, ...updatedData };
    }

    this.loading = true;
    try {
      const token = await this.ensureAuthToken(username);
      const response = await fetch(
        `https://test-task-api.allfuneral.com/contacts/${contactId}`,
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
        throw new Error('Failed to update contact');
      }
      this.contacts = await response.json();
    } catch (err: unknown) {
      if (backupContacts) {
        this.contacts = backupContacts;
      }
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = String(err);
      }
      throw err;
    } finally {
      this.loading = false;
    }
  }
}

export const contactsStore = new ContactsStore();
