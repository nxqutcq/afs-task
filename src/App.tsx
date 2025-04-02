import '../styles/global.scss';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__menu">
          <img src="/icons/OakTree.svg" height={36} width={36} alt="OakTree" />
          <div className="sidebar__menu-header">
            <div className="sidebar__menu-icon-wrapper">
              <img
                src="/icons/Briefcase.svg"
                height={20}
                width={20}
                alt="Briefcase"
              />
            </div>
            <div className="sidebar__menu-icon-wrapper">
              <img
                src="/icons/MagnifyingGlass.svg"
                height={20}
                width={20}
                alt="MagnifyingGlass"
              />
            </div>
          </div>
          <div className="sidebar__menu-footer">
            <hr className="sidebar__divider" />
            <div className="sidebar__menu-icon-wrapper">
              <img
                src="/icons/Settings.svg"
                height={20}
                width={20}
                alt="Settings"
              />
            </div>
            <div className="sidebar__menu-icon-wrapper">
              <img
                src="/icons/SignOut.svg"
                height={20}
                width={20}
                alt="SignOut"
              />
            </div>
          </div>
        </div>
        <div className="sidebar__content">
          <div>
            <div className="sidebar__header">
              <h1 className="sidebar__title">Oak Tree cemetery</h1>
              <span className="sidebar__subtitle">Process Manager</span>
            </div>
            <hr className="sidebar__divider--primary" />
            <nav className="sidebar__nav">
              <div className="sidebar__nav-item">Organizations</div>
              <div className="sidebar__nav-item">Contractors</div>
              <div className="sidebar__nav-item">Clients</div>
            </nav>
          </div>
          <div className="sidebar__copyright">
            All Funeral Services © 2015-2025
          </div>
        </div>
      </aside>
      <main className="content">
        <button className="content__chevron-btn">back</button>
        <div className="content__main">
          <h4 className="content__company-name">Eternal Rest Funeral Home</h4>
          <div className="content__item"></div>
          <div className="content__item">c</div>
          <div className="content__item">as</div>
        </div>
      </main>
    </div>
  );
}

export default App;
