import { useEffect, useState } from 'react';
import '../styles/global.scss';
import { companyStore } from '../store/CompanyStore';

export const Content = () => {
  const token = 'YOUR_AUTH_TOKEN_HERE';
  const companyId = '12';

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
    <main className="content">
      {/* <button className="content__chevron-btn">back</button> */}
      <div className="content__main">
        <h4 className="content__company-name">{companyStore.company.name}</h4>
        <div className="content__item"></div>
        <div className="content__item">c</div>
        <div className="content__item">as</div>
      </div>
    </main>
  );
};
