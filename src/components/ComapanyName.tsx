import { Edit } from './shared/icons/Edit';
import { Trash } from './shared/icons/Trash';

export const ComapanyName = () => {
  return (
    <div className="content__company-name-wrapper">
      {/* <Dialog title={`Specify the Organization's name`}>
        <label>
          Название:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
      </Dialog> */}
      <span className="content__company-name">{}</span>
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
};
