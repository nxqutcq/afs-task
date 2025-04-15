import { observer } from 'mobx-react-lite';
import { Edit } from './shared/icons/Edit';
import { Trash } from './shared/icons/Trash';
import { companyStore } from '../store/CompanyStore';
import { Dialog } from './shared/Dialog';
import { companyId, token } from '../constants';
import { useState } from 'react';

export const ComapanyName = observer(() => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    await companyStore.updateCompany(formData, companyId, token);
    setEditMode(false);
  };

  return (
    <div className="content__company-name-wrapper">
      {/* <Dialog title={`Specify the Organization's name`}>
        <button>Cancel</button>
        <button>Save changes</button>
      </Dialog>
      <Dialog
        isOpen
        title={`Are you sure you want to remove this Organization?`}
      >
        <button>No</button>
        <button>Yes, remove</button>
      </Dialog> */}
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
  );
});
