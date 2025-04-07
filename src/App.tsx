import '../styles/global.scss';
import { Content } from './components/Content';
import { SideBar } from './layout/SideBar';

export const App = () => (
  <div className="app">
    <SideBar />
    <Content />
  </div>
);
