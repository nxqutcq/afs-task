import '../styles/global.scss';
import {
  Briefcase,
  Contractor,
  MagnifyingGlass,
  Settings,
  SignOut,
  User,
} from '../components/shared/icons';

export const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="menu">
        <div className="menu-header">
          <img src="/icons/OakTree.svg" height={36} width={36} alt="OakTree" />
          <div className="menu-icon-wrapper">
            <Briefcase height={20} color="white" width={20} />
          </div>
          <div className="menu-icon-wrapper">
            <MagnifyingGlass height={20} width={20} />
          </div>
        </div>
        <div className="menu-footer">
          <hr className="menu__divider" />
          <div className="menu-icon-wrapper">
            <Settings height={20} width={20} />
          </div>
          <div className="menu-icon-wrapper">
            <SignOut height={20} width={20} />
          </div>
        </div>
      </div>
      <aside className="sidebar">
        <div className="sidebar__content">
          <div className="sidebar_content_wrapper">
            <div className="sidebar__header">
              <span className="sidebar__title">Oak Tree cemetery</span>
              <span className="sidebar__subtitle">Process Manager</span>
            </div>
            <hr className="sidebar__divider--primary" />
            <nav className="sidebar__nav">
              <div className="sidebar__nav-item">
                <Briefcase height={16} width={16} />
                Organizations
              </div>
              <div className="sidebar__nav-item">
                <Contractor height={16} width={16} />
                Contractors
              </div>
              <div className="sidebar__nav-item">
                <User height={16} width={16} />
                Clients
              </div>
            </nav>
          </div>
          <div className="sidebar__copyright">
            All Funeral Services © 2015-2025
          </div>
        </div>
      </aside>
    </div>
  );
};
