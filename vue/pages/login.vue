<script setup lang="ts">
import { useSession } from '~/stores/session';

const { t } = useI18n();

const router = useRouter();
const session = useSession();

const data = $ref({
  login: {
    username: '',
    password: '',
    error: '',
  },
  register: {
    username: '',
    password: '',
    repeatedPassword: '',
    error: '',
  },
});

const logIn = async () => {
  const { username, password } = data.login;

  if (!username) {
    data.login.error = t('login.error.no_username');
    return;
  }
  if (!password) {
    data.login.error = t('login.error.no_password');
    return;
  }

  await session.logIn({ username, password });

  if (session.isAuth) {
    router.push('/');
  } else {
    data.login.error = t('login.error.login_failed');
  }
};

const register = async () => {
  const { username, password, repeatedPassword } = data.register;

  if (!username) {
    data.register.error = t('login.error.no_username');
    return;
  }
  if (!password) {
    data.register.error = t('login.error.no_password');
    return;
  }
  if (password !== repeatedPassword) {
    data.register.error = t('login.error.passwords_not_match');
    return;
  }

  await session.register({ username, password });

  if (session.isAuth) {
    router.push('/');
  } else {
    data.register.error = t('login.error.register_failed');
  }
};
</script>

<template>
  <div
    _h-full
    _flex="~ col md:row"
    _children="grow flex flex-col items-center gap-4 pt-[10%] pb-[20%]"
  >
    <div>
      <div _text-xl>{{ t('login.log_in') }}</div>

      <base-input
        v-model="data.login.username"
        :placeholder="t('login.username')"
        autofocus
        @keydown.enter="logIn"
      />

      <base-input
        v-model="data.login.password"
        type="password"
        :placeholder="t('login.password')"
        @keydown.enter="logIn"
      />

      <base-button @click="logIn">{{ t('submit') }}</base-button>

      <base-fade-transition>
        <div
          v-if="data.login.error"
          :key="data.login.error"
          _text-error
          _italic
        >
          {{ data.login.error }}
        </div>
      </base-fade-transition>
    </div>

    <div
      _hidden="!"
      _block="md:!"
      _grow-0
      _self-stretch
      _my-10
      _w-2px
      _bg-secondary
      _op20
      _rounded
    />

    <div>
      <div _text-xl>{{ t('login.register') }}</div>

      <base-input
        v-model="data.register.username"
        :placeholder="t('login.username')"
        @keydown.enter="register"
      />

      <base-input
        v-model="data.register.password"
        type="password"
        :placeholder="t('login.password')"
        @keydown.enter="register"
      />

      <base-input
        v-model="data.register.repeatedPassword"
        type="password"
        :placeholder="t('login.repeat_password')"
        @keydown.enter="register"
      />

      <base-button @click="register">{{ t('submit') }}</base-button>

      <base-fade-transition>
        <div
          v-if="data.register.error"
          :key="data.register.error"
          _text-error
          _italic
        >
          {{ data.register.error }}
        </div>
      </base-fade-transition>
    </div>
  </div>
</template>
