import { InMemoryCache } from '@apollo/client/core/core.cjs.js';
import { SvelteApolloClient } from 'svelte-apollo-client';

export const client = SvelteApolloClient({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
  cache: new InMemoryCache()
});
