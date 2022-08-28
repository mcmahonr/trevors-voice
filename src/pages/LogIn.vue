<template>
  <q-page class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md fixed-center"
    >
      <q-input
        filled
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your username',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="pasword"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { ref } from 'vue';
import { usePecsStore } from 'src/stores/pecs-store';
import { useRouter } from 'vue-router';

const pecsStore = usePecsStore();
const router = useRouter();

const username = ref(null);
const password = ref(null);

async function onSubmit() {
  if (username.value === null || password.value === null) {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to specify both a username and a password',
      timeout: 5000,
    });
    return;
  }

  const success = await pecsStore.login(username.value, password.value);

  if (success) {
    console.log('Successfully logged in!');
    // Redirect to main PECs board
    router.push('/board/' + username.value);
    Notify.create({
      color: 'green-5',
      textColor: 'white',
      message: 'Successfully logged in.',
      timeout: 3000,
    });
  } else {
    Notify.create({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message:
        'The username or password you specified were incorrect, please try again',
      timeout: 5000,
    });
  }
}

const onReset = () => {
  username.value = null;
  password.value = null;
};
</script>
