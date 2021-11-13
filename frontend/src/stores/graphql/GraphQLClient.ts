import { InMemoryCache } from '@apollo/client/core/core.cjs.js';
import { SvelteApolloClient } from 'svelte-apollo-client';

export const client = SvelteApolloClient({
  uri: `${ process.env.NODE_ENV == 'production' ? 'https://api.stricjet.tech' : 'http://localhost:3001' }/graphql`,
  credentials: 'include',
  cache: new InMemoryCache()
});
