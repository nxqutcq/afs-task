import { lazy } from 'react';

export const Organizations = lazy(() =>
  import('../pages/Organizations.tsx').then((module) => ({
    default: module.Organizations,
  }))
);
export const Contractors = lazy(() =>
  import('../pages/Contractors.tsx').then((module) => ({
    default: module.Contractors,
  }))
);
export const Clients = lazy(() =>
  import('../pages/Clients.tsx').then((module) => ({
    default: module.Clients,
  }))
);
export const Search = lazy(() =>
  import('../pages/Search.tsx').then((module) => ({
    default: module.Search,
  }))
);
export const Settings = lazy(() =>
  import('../pages/Settings.tsx').then((module) => ({
    default: module.Settings,
  }))
);
export const SignOut = lazy(() =>
  import('../pages/SignOut.tsx').then((module) => ({
    default: module.SignOut,
  }))
);
export const NotFound = lazy(() =>
  import('../pages/NotFound.tsx').then((module) => ({
    default: module.NotFound,
  }))
);
