import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layout/DashboardLayout';
import {
  Clients,
  Contractors,
  NotFound,
  Organizations,
  Search,
  Settings,
  SignOut,
} from '../routes/LazyRoutes';
import { ROUTES } from '.';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/company/organizations" replace />} />

      <Route path="company">
        <Route path={ROUTES.ORGANIZATIONS} element={<Organizations />} />
        <Route path={ROUTES.CONTRACTORS} element={<Contractors />} />
        <Route path={ROUTES.CLIENTS} element={<Clients />} />
      </Route>

      <Route path={ROUTES.SEARCH} element={<Search />} />
      <Route path={ROUTES.SETTINGS} element={<Settings />} />
      <Route path={ROUTES.SIGNOUT} element={<SignOut />} />

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Route>
  </Routes>
);
