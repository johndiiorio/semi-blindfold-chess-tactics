import { preloadQuery } from 'react-relay/hooks';
import JSResource from './utils/JSResource';
import RelayEnvironment from './RelayEnvironment';
import RootQuery from '../__generated__/relay/homeQuery.graphql';

const routes = [
  {
    path: '/',
    exact: true,
    component: JSResource('Root', () => import('./pages/home')),
    prepare: () => {
      return {
        query: preloadQuery(RelayEnvironment, RootQuery, {}, { fetchPolicy: 'store-or-network' }),
      };
    },
  },
];

export default routes;
