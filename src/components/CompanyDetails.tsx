import { useEffect, useState } from 'react';
import { formatCompanyTypes } from '../utils/formatCompanyTypes';
import { formatIsoToDate } from '../utils/formatIsoToDate';
import { Edit } from './shared/icons/Edit';
import { companyId, token } from '../constants';
import { companyStore } from '../store/CompanyStore';
import { observer } from 'mobx-react-lite';

export const CompanyDetails = observer(() => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    businessEntity: '',
  });

  useEffect(() => {
    companyStore.fetchCompany(companyId, token);
  }, []);

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

  if (companyStore.error) return <div>Error: {companyStore.error}</div>;
  const issueDate = companyStore.company?.contract?.issue_date;
  return (
    <div className="content__item">
      {companyStore.detailsLoading ? (
        <div>Loading details</div>
      ) : (
        <div className="company-card">
          {editMode ? (
            <div className="company-card__edit">
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
              <div className="company-card__view__header">
                <span className="company-card__view__header-details">
                  Company details
                </span>
                <div
                  className="company-card__view-btn"
                  onClick={() => setEditMode(true)}
                >
                  <Edit width={16} height={16} />
                  <span>Edit</span>
                </div>
              </div>
              <p>
                <span>Agreement:</span> {companyStore.company?.contract.no} /{' '}
                {issueDate ? formatIsoToDate(issueDate) : 'Date not specified'}
              </p>
              <p>
                <span>Business entity: </span>{' '}
                {companyStore.company?.businessEntity}
              </p>
              <p>
                <span>Company type: </span>{' '}
                {formatCompanyTypes(companyStore.company?.type)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
