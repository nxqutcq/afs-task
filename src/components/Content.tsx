import '../styles/global.scss';
import { PhotosSection } from './PhotosSection';
import { CompanyDetails } from './CompanyDetails';
import { ContactsSection } from './ContactsSection';
import { ComapanyName } from './ComapanyName';

export const Content = () => {
  return (
    <main className="content">
      <div className="content__main">
        <ComapanyName />
        <CompanyDetails />
        <ContactsSection />
        <PhotosSection />
      </div>
    </main>
  );
};
