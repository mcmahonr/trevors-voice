import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import axios from 'axios';
import { UserData } from 'src/components/models';
import { Ref, ref, computed } from 'vue';

const loginUrl: string =
  process.env.LOGIN_URL || 'http://localhost:8000/auth/obtain_token/';
const refreshUrl: string =
  process.env.REFRESH_URL || 'http://localhost:8000/auth/refresh_token/';

function getStoredUserData(): UserData {
  return {
    username: LocalStorage.getItem('username'),
    accessToken: LocalStorage.getItem('accessToken'),
    refreshToken: LocalStorage.getItem('refrehToken'),
  };
}

export const usePecsStore = defineStore('pecs', () => {
  const currentUserData: Ref<UserData> = ref({
    username: null,
    accessToken: null,
    refreshToken: null,
  });

  currentUserData.value = getStoredUserData();

  const isLoggedIn = computed(() => currentUserData.value.username !== 'null');

  async function login(username: string, password: string) {
    console.log('Logging in with URL: ' + loginUrl);
    const response = await axios
      .post(loginUrl, { username, password })
      .catch(function (err) {
        console.log('There was an error logging in with username ' + username);
        console.log(err);
      });
    console.log('Response: ');
    console.log(response);

    if (!response) {
      return false;
    }

    LocalStorage.set('username', username);
    LocalStorage.set('accessToken', response.data.access);
    LocalStorage.set('refreshToken', response.data.refresh);
    currentUserData.value = getStoredUserData();
    return true;
  }

  async function refresh() {
    console.log('Refreshing token with URL: ' + refreshUrl);
    const response = await axios
      .post(refreshUrl, {
        refresh: currentUserData.value.refreshToken,
      })
      .catch(function (err) {
        console.log('There was an error while refreshing the access token');
        console.log(err);
      });

    if (!response) {
      return;
    }

    LocalStorage.set('accessToken', response.data.access);
    currentUserData.value = getStoredUserData();
  }
  function logout() {
    console.log('logout called');
    LocalStorage.set('username', null);
    LocalStorage.set('accessToken', null);
    LocalStorage.set('refreshToken', null);
    currentUserData.value = getStoredUserData();
  }
  async function getPecBoard(boardId: string) {
    console.log('getPecBoard called with ' + boardId);
  }

  return {
    login,
    refresh,
    logout,
    getPecBoard,
    isLoggedIn,
    currentUserData,
  };
});
