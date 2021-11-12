<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  import { CurrentProfile, ICurrentProfile } from 'src/stores';

  onMount(async () => {
    // Checking if current page
    // contains token query
    const token = $page.query.get('token');
    
    if (!token) {
      // Sending user to authorize page
      console.log('Send to auth');
    } else {
      // Trying to authorize user using
      // given token.

      // Updating user store
      CurrentProfile.authorize(token);

      // Redirecting user to /app route
      CurrentProfile.subscribe((object: ICurrentProfile) => {
        if (object.loggedIn) goto('/app')
      });
    };
  });
</script>