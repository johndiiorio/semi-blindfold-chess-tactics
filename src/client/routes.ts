import { preloadQuery } from 'react-relay/hooks';
import JSResource from './utils/JSResource';
import RelayEnvironment from './RelayEnvironment';
import PageQuery from './pages/home/__generated__/PageQuery.graphql';

const routes = [
  {
    path: '/',
    exact: true,
    component: JSResource('Root', () => import('./pages/home')),
    prepare: () => {
      return {
        query: preloadQuery(
          RelayEnvironment,
          PageQuery,
          {},
          { fetchPolicy: 'store-or-network' }
        ),
      };
    },
  },
];

export default routes;
