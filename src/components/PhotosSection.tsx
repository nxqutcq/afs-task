import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore } from '../store/CompanyStore';
import { AddPhoto } from './shared/icons/AddPhoto';
import { Trash } from './shared/icons/Trash';
import { SkeletonPhoto } from './shared/SkeletonPhoto';
import { companyId, token } from '../constants';
import { FullScreenImageModal } from './shared/FullScreenImageModal';

export const PhotosSection = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const skeletonCount = 3;

  return (
    <div className="content__item">
      <FullScreenImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
        {companyStore.photoLoading ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              className="content__item__photos-item"
              key={`skeleton-${index}`}
            >
              <SkeletonPhoto />
            </div>
          ))
        ) : companyStore.company?.photos?.length ? (
          companyStore.company.photos.map((photo, index) => (
            <div
              className="content__item__photos-item"
              key={photo.thumbpath || index}
            >
              <img
                loading="lazy"
                src={photo.thumbpath}
                alt={`Photo ${index}`}
                onClick={() => handleImageClick(photo.filepath)}
              />
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
          ))
        ) : (
          <div className="content__item__photos-empty">No photos available</div>
        )}
      </div>
    </div>
  );
});
