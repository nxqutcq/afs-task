import '../styles/global.scss';
import { PhotosSection } from './PhotosSection';
import { CompanyDetails } from './CompanyDetails';
import { ContactsSection } from './ContactsSection';
import { ComapanyName } from './ComapanyName';
import { Chevron } from './shared/icons/Chevron';

export const Content = () => {
  return (
    <main className="content">
      <div className="content__main">
        <div className="content__back__button">
          <Chevron />
        </div>
        <ComapanyName />
        <CompanyDetails />
        <ContactsSection />
        <PhotosSection />
      </div>
    </main>
  );
};
