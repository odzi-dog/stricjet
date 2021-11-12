import { writable } from 'svelte/store';
import type { IProfile } from '@app/shared';

// Importing queries
import type { ILoginMutationResponse } from 'src/queries';
import type { IFetchMeData } from 'src/queries';
import { LoginMutation, FetchMe } from 'src/queries';

import { client } from 'src/stores';

// Exporting ICurrentProfile store interface
export interface ICurrentProfile {
  loggedIn: boolean;
  profile: IProfile;
};

// Function to initialize CurrentUser store
function _initialize() {
  const defaultStore: Partial<ICurrentProfile> = {
    loggedIn: false,
  };
  const { subscribe, update } = writable(defaultStore);

  // Function that'll handle user profile
  // updating process
  function updateProfile(profile?: IProfile) {
    update((object: ICurrentProfile) => {
      if (profile == null) {
        object.loggedIn = false;
        object.profile = null
      } else {
        object.loggedIn = true;
        object.profile = profile;
      };

      return object;
    });
  };

  // 
  // Initializing our store
  return {
    subscribe,

    async authorize(token: string) {
      const response = (await client.mutate(LoginMutation, { variables: { token } })) as ILoginMutationResponse;
        
      // Checking for errors
      if (response.errors) {
        // +todo
        // error handling and visialization
        console.error('graphql authorize mutation error', response.errors);
      } else {
        // Updating user store
        updateProfile(response.data.login);
      };
    },
  
    // public fetchMe
    async fetchMe() {
      return new Promise((resolve, reject) => {
        client.query<IFetchMeData>(FetchMe).subscribe((response) => {
          // Waiting for response to finish loading
          if (response.loading) return;
  
          // Checking response
          if (response.error) {
            // +todo
            // error handling and visialization
            console.error('graphql fetchme query error', response.error);
            reject({ error: true });
          } else {
            updateProfile(response.data?.me);
            resolve(response);
          };  
        });
      });
    },
  };
};


// Exporting CurrentProfile store
export const CurrentProfile = _initialize();
