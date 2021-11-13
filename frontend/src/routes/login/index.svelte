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
      const resourceId = "617a552bb4a7bfad0b9a1b4a";
      goto(`https://cloud.odzi.dog/auth/v1/${resourceId}`);
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