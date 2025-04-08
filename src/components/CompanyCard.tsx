import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../store/CompanyStore';

interface CompanyCardProps {
  companyId: string;
  token: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = observer(
  ({ companyId, token }: CompanyCardProps) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      shortName: '',
      businessEntity: '',
    });

    useEffect(() => {
      companyStore.fetchCompany(companyId, token);
    }, [companyId, token]);

    useEffect(() => {
      if (companyStore.company) {
        setFormData({
          name: companyStore.company.name,
          shortName: companyStore.company.shortName,
          businessEntity: companyStore.company.businessEntity,
        });
      }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
      await companyStore.updateCompany(formData, companyId, token);
      setEditMode(false);
    };

    if (companyStore.loading) return <div>Loading...</div>;
    if (companyStore.error) return <div>Error: {companyStore.error}</div>;
    if (!companyStore.company) return null;

    return (
      <div className="company-card">
        {editMode ? (
          <div className="company-card__edit">
            <label>
              Название:
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Краткое название:
              <input
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
              />
            </label>
            <label>
              Тип организации:
              <input
                name="businessEntity"
                value={formData.businessEntity}
                onChange={handleChange}
              />
            </label>
            <div className="company-card__buttons">
              <button onClick={handleSave}>Сохранить</button>
              <button onClick={() => setEditMode(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <div className="company-card__view">
            <h2>{companyStore.company.name}</h2>
            <p>
              <strong>Краткое название:</strong>{' '}
              {companyStore.company.shortName}
            </p>
            <p>
              <strong>Тип организации:</strong>{' '}
              {companyStore.company.businessEntity}
            </p>
            <button onClick={() => setEditMode(true)}>Редактировать</button>
          </div>
        )}
      </div>
    );
  }
);
