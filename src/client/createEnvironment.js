import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchQuery(operation, variables) {
  let headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch('/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const createEnvironment = () => {
  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
};

export default createEnvironment;
