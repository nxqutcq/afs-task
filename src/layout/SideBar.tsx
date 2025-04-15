import '../styles/global.scss';
import {
  Briefcase,
  Contractor,
  MagnifyingGlass,
  Settings,
  SignOut,
  User,
} from '../components/shared/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

export const SideBar = () => {
  const location = useLocation();

  const isBriefcaseActive = location.pathname.startsWith('/company');

  return (
    <div className="sidebar-wrapper">
      <div className="menu">
        <div className="menu-header">
          <img src="/icons/OakTree.svg" height={36} width={36} alt="OakTree" />
          <div className="menu-icon-wrapper">
            <NavLink
              className={() =>
                isBriefcaseActive
                  ? 'sidebar__menu-item-link active'
                  : 'sidebar__menu-item-link'
              }
              to={ROUTES.ORGANIZATIONS}
            >
              <Briefcase height={20} color="white" width={20} />
            </NavLink>
          </div>
          <div className="menu-icon-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'sidebar__menu-item-link active'
                  : 'sidebar__menu-item-link'
              }
              to={ROUTES.SEARCH}
            >
              <MagnifyingGlass height={20} width={20} />
            </NavLink>
          </div>
        </div>
        <hr className="menu__divider" />
        <div className="menu-footer">
          <div className="menu-icon-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'sidebar__menu-item-link active'
                  : 'sidebar__menu-item-link'
              }
              to={ROUTES.SETTINGS}
            >
              <Settings height={20} width={20} />
            </NavLink>
          </div>
          <div className="menu-icon-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'sidebar__menu-item-link active'
                  : 'sidebar__menu-item-link'
              }
              to={ROUTES.SIGNOUT}
            >
              <SignOut height={20} width={20} />
            </NavLink>
          </div>
        </div>
      </div>
      <aside className={`sidebar ${!isBriefcaseActive ? 'collapsed' : ''}`}>
        <div className="sidebar__content">
          <div className="sidebar_content_wrapper">
            <div className="sidebar__header">
              <span className="sidebar__title">Oak Tree Cemetery</span>
              <span className="sidebar__subtitle">Process Manager</span>
            </div>
            <hr className="sidebar__divider--primary" />
            <nav className="sidebar__nav">
              <div className="sidebar__nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'sidebar__nav-item-link active'
                      : 'sidebar__nav-item-link'
                  }
                  to={ROUTES.ORGANIZATIONS}
                >
                  <Briefcase height={16} width={16} />
                  <span className="sidebar__nav-item-text">Organizations</span>
                </NavLink>
              </div>
              <div className="sidebar__nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'sidebar__nav-item-link active'
                      : 'sidebar__nav-item-link'
                  }
                  to={ROUTES.CONTRACTORS}
                >
                  <Contractor height={16} width={16} />
                  <span className="sidebar__nav-item-text">Contractors</span>
                </NavLink>
              </div>
              <div className="sidebar__nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'sidebar__nav-item-link active'
                      : 'sidebar__nav-item-link'
                  }
                  to={ROUTES.CLIENTS}
                >
                  <User height={16} width={16} />
                  <span className="sidebar__nav-item-text">Clients</span>
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
