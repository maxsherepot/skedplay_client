const routes = [
  {
    path: '/',
    exact: true,
    component: () => import('./pages/home/index'),
  },
];

export default routes;
