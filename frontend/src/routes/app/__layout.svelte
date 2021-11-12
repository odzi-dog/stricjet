<script lang="ts">
  // Importing modules
  import { CurrentProfile } from 'src/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Trying to fetch profile
    // information...
    CurrentProfile.fetchMe()
      .catch(() => {
        goto('/');
      });
  });
</script>

{ #if $CurrentProfile.loggedIn }
  <slot />
{ :else }
  <p>Getting profile information...</p>
{ /if }