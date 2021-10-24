<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
