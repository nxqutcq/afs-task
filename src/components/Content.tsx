import { useEffect, useState } from 'react';
import '../styles/global.scss';
import { companyStore } from '../store/CompanyStore';
import { contactsStore } from '../store/ContactsStore';
import { observer } from 'mobx-react-lite';
import { PhotosSection } from './PhotosSection';
import { CompanyDetails } from './CompanyDetails';
import { ContactsSection } from './ContactsSection';
import { ComapanyName } from './ComapanyName';
import { companyId, contactId, token } from '../constants';

export const Content = observer(() => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    businessEntity: '',
  });

  useEffect(() => {
    companyStore.fetchCompany(companyId, token);
    contactsStore.fetchContact(contactId, token);
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

  if (companyStore.loading || contactsStore.loading)
    return <div>Loading...</div>;
  if (companyStore.error || contactsStore.error)
    return <div>Error: {companyStore.error}</div>;
  if (!companyStore.company) return <div>No company data available</div>;

  return (
    <main className="content">
      <div className="content__main">
        <ComapanyName name={companyStore.company?.name} />
        <CompanyDetails
          {...{
            editMode,
            formData,
            handleChange,
            handleSave,
            setEditMode,
          }}
          company={companyStore.company}
        />
        <ContactsSection
          email={contactsStore.contacts?.email}
          firstname={contactsStore.contacts?.firstname}
          lastname={contactsStore.contacts?.lastname}
          phone={contactsStore.contacts?.phone}
        />
        <PhotosSection />
      </div>
    </main>
  );
});
