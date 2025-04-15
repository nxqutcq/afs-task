import { useEffect, useState } from 'react';
import { formatCompanyTypes } from '../utils/formatCompanyTypes';
import { formatIsoToDate } from '../utils/formatIsoToDate';
import { Edit } from './shared/icons/Edit';
import { companyId, token } from '../constants';
import { companyStore } from '../store/CompanyStore';
import { observer } from 'mobx-react-lite';
import { SingleSelect } from './shared/SingleSelect';
import { MultiSelect } from './shared/MultiSelect';
import { CustomDatePicker } from './shared/CustomDatePicker';

export const CompanyDetails = observer(() => {
  const singleOptions = [
    { label: 'Partnership', value: 'partnership' },
    { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
    { label: 'Limited Liability Company', value: 'limited_liability_company' },
  ];

  const multiOptions = [
    { label: 'Funeral Home', value: 'funeral_home' },
    { label: 'Logistics services', value: 'logistics_services' },
    { label: 'Burial care Contractor', value: 'burial_care_contractor' },
  ];
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSave = async () => {
    await companyStore.updateCompany(formData, companyId, token);
    setEditMode(false);
  };

  const issueDate = companyStore.company?.contract?.issue_date;
  return (
    <div className="content__item">
      {companyStore.error && <div className="error">{companyStore.error}</div>}
      {companyStore.isFetching ? (
        <div className="loader"></div>
      ) : (
        <div className="company-card">
          {editMode ? (
            <div className="company-card__edit">
              <div>
                <div className="company-card__view">
                  <div className="company-card__view__header">
                    <span className="company-card__view__header-details">
                      Company details
                    </span>
                  </div>
                  <p>
                    <span>Agreement number:</span>{' '}
                    <input
                      type="text"
                      value={companyStore.company?.contract.no}
                    />{' '}
                    <span>Date: </span>
                    <CustomDatePicker />
                  </p>
                  <p>
                    <span>Business entity: </span>{' '}
                    <SingleSelect
                      options={singleOptions}
                      defaultValue="partnership"
                    />
                  </p>
                  <p>
                    <span>Company type: </span>{' '}
                    <MultiSelect
                      options={multiOptions}
                      defaultSelected={['funeral_home', 'logistics_services']}
                    />
                  </p>
                </div>
              </div>
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
