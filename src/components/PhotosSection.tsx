import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../store/CompanyStore';
import { AddPhoto } from './shared/icons/AddPhoto';
import { Trash } from './shared/icons/Trash';

export const PhotosSection = observer(() => {
  const companyId = '12';
  const token = 'YOUR_AUTH_TOKEN_HERE';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      await companyStore.addImage(file, companyId, token);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (imageName: string) => {
    await companyStore.deleteImage(imageName, companyId, token);
  };

  return (
    <div className="content__item">
      <div className="content__item__photo-header">
        <span>Photos</span>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="company-card__view-btn"
        >
          <AddPhoto width={16} height={16} />
          <span>Add</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>
      <div className="content__item__photos">
        {companyStore.company?.photos?.map((photo, index) => (
          <div
            className="content__item__photos-item"
            key={photo.thumbpath || index}
          >
            <img loading="lazy" src={photo.thumbpath} alt={'Photo ' + index} />
            <div
              className="content__item__photos-item-trash"
              onClick={() => handleDeleteImage(photo.name)}
            >
              <Trash
                width={16}
                height={16}
                className="content__item__photos-item-trash-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
