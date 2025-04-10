import { formatCompanyTypes } from '../utils/formatCompanyTypes';
import { formatIsoToDate } from '../utils/formatIsoToDate';
import { Edit } from './shared/icons/Edit';

type CompanyDetailsProps = {
  editMode: boolean;
  formData: {
    name: string;
    shortName: string;
    businessEntity: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  setEditMode: (value: boolean) => void;
  company: {
    contract: {
      no: string;
      issue_date: string;
    };
    businessEntity: string;
    type: string[];
  };
};

export const CompanyDetails = ({
  editMode,
  formData,
  handleChange,
  handleSave,
  setEditMode,
  company,
}: CompanyDetailsProps) => {
  return (
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
              <strong>Agreement:</strong> {company?.contract.no} /{' '}
              {formatIsoToDate(company!.contract.issue_date)}
            </p>
            <p>
              <strong>Business entity: </strong> {company?.businessEntity}
            </p>
            <p>
              <strong>Company type: </strong>{' '}
              {formatCompanyTypes(company?.type)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
