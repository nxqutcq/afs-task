import '../styles/global.scss';
import { CompanyCard } from './CompanyCard';

export const Content = () => {
  const token = 'YOUR_AUTH_TOKEN_HERE';
  const companyId = '12';

  return (
    <main className="content">
      {/* <button className="content__chevron-btn">back</button> */}
      <div className="content__main">
        <h4 className="content__company-name">Eternal Rest Funeral Home</h4>
        <div className="content__item">
          <CompanyCard companyId={companyId} token={token} />
        </div>
        <div className="content__item">c</div>
        <div className="content__item">as</div>
      </div>
    </main>
  );
};
