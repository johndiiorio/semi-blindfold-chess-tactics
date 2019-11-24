import { preloadQuery } from 'react-relay/hooks';
import JSResource from './utils/JSResource';
import RelayEnvironment from './RelayEnvironment';

const routes = [
  {
    path: '/',
    exact: true,
    component: JSResource('Root', () => import('./pages/home')),
    prepare: params => {
      const RootQuery = require('../__generated__/relay/homeQuery.graphql');
      return {
        query: preloadQuery(RelayEnvironment, RootQuery, {}, { fetchPolicy: 'store-or-network' }),
      };
    },
  },
];

export default routes;
