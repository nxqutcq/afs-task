import { Contacts } from '../types/contacts';
import { Edit } from './shared/icons/Edit';

type ContactsProps = Partial<Omit<Contacts, 'id' | 'createdAt' | 'updatedAt'>>;

export const ContactsSection = ({
  firstname,
  lastname,
  email,
  phone,
}: ContactsProps) => {
  return (
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
              {firstname} {lastname}
            </span>
          </div>
          <span>Phone number:{phone}</span>
          <span>E-mail:{email}</span>
        </div>
      </div>
    </div>
  );
};
