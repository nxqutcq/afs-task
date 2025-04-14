import { useEffect, useState } from 'react';
import { contactsStore } from '../store/ContactsStore';
import { Edit } from './shared/icons/Edit';
import { contactId, token } from '../constants';
import { observer } from 'mobx-react-lite';
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../utils/contactsValidation';

export const ContactsSection = observer(() => {
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const contacts = contactsStore.contacts;

  useEffect(() => {
    if (contacts) {
      setFullName(`${contacts.firstname} ${contacts.lastname}`);
      setPhone(contacts.phone);
      setEmail(contacts.email);
    }
  }, [contacts]);

  const resetForm = () => {
    setErrorMessage('');
    if (contactsStore.contacts) {
      setFullName(
        `${contactsStore.contacts.firstname} ${contactsStore.contacts.lastname}`
      );
      setPhone(contactsStore.contacts.phone);
      setEmail(contactsStore.contacts.email);
    }
  };

  useEffect(() => {
    contactsStore.fetchContact(contactId, token);
  }, []);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    setErrorMessage('');

    if (!validatePhone(phone)) {
      setErrorMessage('Incorrect phone format');
      return;
    }
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length < 2) {
      setErrorMessage('Incorrect firstname or lastname');
      return;
    }
    const [firstname, lastname] = nameParts;
    if (!validateName(firstname) || !validateName(lastname)) {
      setErrorMessage('Incorrect firstname or lastname');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Incorrect email');
      return;
    }

    const updatedData = { firstname, lastname, phone, email };

    setEditMode(false);

    contactsStore.updateContacts(updatedData, contactId, token).catch((err) => {
      const errorMessageText =
        err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(errorMessageText);
    });
  };

  return (
    <div className="content__item">
      {editMode ? (
        <div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <label>
            Responsible person:
            <input value={fullName} onChange={handleFullNameChange} />
          </label>
          <label>
            Phone number:
            <input value={phone} onChange={handlePhoneChange} />
          </label>
          <label>
            E-mail:
            <input value={email} onChange={handleEmailChange} />
          </label>
          <div className="company-card__buttons">
            <button onClick={handleSave}>Save changes</button>
            <button
              onClick={() => {
                resetForm();
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="content__item__contact">
          <div className="content__item__contact-header">
            <span>Contacts</span>
            <div
              onClick={() => setEditMode(true)}
              className="company-card__view-btn"
            >
              <Edit width={16} height={16} />
              <span>Edit</span>
            </div>
          </div>
          <div className="content__item__contact-footer">
            <div>
              <span>Responsible person: </span>
              <span>
                {contactsStore.contacts?.firstname}{' '}
                {contactsStore.contacts?.lastname}
              </span>
            </div>
            <span>Phone number: {contactsStore.contacts?.phone}</span>
            <span>E-mail: {contactsStore.contacts?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
});
