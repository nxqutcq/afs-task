import '../styles/global.scss';
import {
  Briefcase,
  Contractor,
  MagnifyingGlass,
  Settings,
  SignOut,
  User,
} from '../components/shared/icons';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../routes';

export const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="menu">
        <div className="menu-header">
          <img src="/icons/OakTree.svg" height={36} width={36} alt="OakTree" />
          <div className="menu-icon-wrapper">
            <NavLink to={ROUTES.ORGANIZATIONS}>
              <Briefcase height={20} color="white" width={20} />
            </NavLink>
          </div>
          <div className="menu-icon-wrapper">
            <NavLink to={ROUTES.SEARCH}>
              <MagnifyingGlass height={20} width={20} />
            </NavLink>
          </div>
        </div>
        <div className="menu-footer">
          <hr className="menu__divider" />
          <div className="menu-icon-wrapper">
            <NavLink to={ROUTES.SETTINGS}>
              <Settings height={20} width={20} />
            </NavLink>
          </div>
          <div className="menu-icon-wrapper">
            <NavLink to={ROUTES.SIGNOUT}>
              <SignOut height={20} width={20} />
            </NavLink>
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
                <NavLink
                  to={ROUTES.ORGANIZATIONS}
                  className="sidebar__nav-link"
                >
                  <Briefcase height={16} width={16} />
                  <span>Organizations</span>
                </NavLink>
              </div>
              <div className="sidebar__nav-item">
                <NavLink to={ROUTES.CONTRACTORS} className="sidebar__nav-link">
                  <Contractor height={16} width={16} />
                  <span>Contractors</span>
                </NavLink>
              </div>
              <div className="sidebar__nav-item">
                <NavLink to={ROUTES.CLIENTS}>
                  <User height={16} width={16} />
                  <span>Clients</span>
                </NavLink>
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
