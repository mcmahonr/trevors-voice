<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Trevor's Voice </q-toolbar-title>

        <div v-if="pecsStore.isLoggedIn">
          Logged in as: {{ pecsStore.currentUserData.username }}
          <q-btn @click="logout">Log Out</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { usePecsStore } from 'src/stores/pecs-store';
import { useRouter } from 'vue-router';

const router = useRouter();

const pecsStore = usePecsStore();

function logout() {
  pecsStore.logout();
  router.push('/login');
}
</script>
