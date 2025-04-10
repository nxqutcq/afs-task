import { useEffect, useState } from 'react';
import '../styles/global.scss';
import { companyStore } from '../store/CompanyStore';
import { formatCompanyTypes } from '../utils/formatCompanyTypes';
import { Edit } from './shared/icons/Edit';
import { contactsStore } from '../store/ContactsStore';
import { Trash } from './shared/icons/Trash';
import { formatIsoToDate } from '../utils/formatIsoToDate';
import { observer } from 'mobx-react-lite';
import { PhotosSection } from './PhotosSection';

export const Content = observer(() => {
  const token = 'YOUR_AUTH_TOKEN_HERE';
  const companyId = '12';
  const contactId = '16';

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    businessEntity: '',
  });

  useEffect(() => {
    companyStore.fetchCompany(companyId, token);
    contactsStore.fetchContact(contactId, token);
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

  if (companyStore.loading || contactsStore.loading)
    return <div>Loading...</div>;
  if (companyStore.error || contactsStore.error)
    return <div>Error: {companyStore.error}</div>;
  if (!companyStore.company) return <div>No company data available</div>;

  return (
    <main className="content">
      <div className="content__main">
        <div className="content__company-name-wrapper">
          <span className="content__company-name">
            {companyStore.company?.name}
          </span>
          <div className="content__icons-wrapper">
            <div>
              <Edit width={20} height={20} />
            </div>
            <div>
              <Trash color="red" width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="content__item">
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
                  <strong>Agreement:</strong>{' '}
                  {companyStore.company?.contract.no} /{' '}
                  {formatIsoToDate(companyStore.company!.contract.issue_date)}
                </p>
                <p>
                  <strong>Business entity: </strong>{' '}
                  {companyStore.company?.businessEntity}
                </p>
                <p>
                  <strong>Company type: </strong>{' '}
                  {formatCompanyTypes(companyStore.company?.type)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="content__item">
          <div className="content__item__contact">
            <div className="content__item__contact-header">
              <span>Contacts</span>
              <div className="company-card__view-btn">
                <Edit width={16} height={16} />
                <span>Edit</span>
              </div>
            </div>
            <div className="content__item__contact-footer">
              <div>
                <span>Responsible person:</span>
                <span>
                  {contactsStore.contacts?.firstname}{' '}
                  {contactsStore.contacts?.lastname}
                </span>
              </div>
              <span>Phone number:{contactsStore.contacts?.phone}</span>
              <span>E-mail:{contactsStore.contacts?.email}</span>
            </div>
          </div>
        </div>
        <PhotosSection />
      </div>
    </main>
  );
});
