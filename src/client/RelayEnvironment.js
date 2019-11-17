import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function relayFetch(params, variables) {
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
      query: params.text,
      variables,
    }),
  });

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(json.errors)}`,
    );
  }

  return json;
}

export default new Environment({
  network: Network.create(relayFetch),
  store: new Store(new RecordSource()),
});
