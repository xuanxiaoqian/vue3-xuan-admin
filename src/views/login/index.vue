<template>
  <div class="flex h-screen items-center justify-center bg-gray-200">
    <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-700">{{ $('xuan') }}</h1>
      </div>

      <div class="mb-4">
        <label for="email" class="mb-2 block font-semibold text-gray-700">{{ $('username') }}</label>
        <input id="email" type="text" v-model="loginData.userName"
          class="w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none" />
      </div>

      <div class="mb-6">
        <label for="password" class="mb-2 block font-semibold text-gray-700">{{ $('password') }}</label>
        <input id="password" type="password" v-model="loginData.userPwd"
          class="w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none" />
      </div>

      <div class="mb-4 flex items-center justify-between" v-if="false">
        <div class="relative">
          <input id="captcha" type="text" @keyup.enter="login"
            class="w-32 rounded-lg border bg-gray-100 px-4 py-2 text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none" />
        </div>
      </div>
      <div class="mb-6">
        <button @click="login"
          class="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
          {{ $('button') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userLogin } from '@/api/user/user'
import { curT } from '@/i18n'
import router from '@/router'
import { useUserStore } from '@/store/modules/user'

const $ = curT('login')

const userStore = useUserStore()

const loginData = reactive({
  userName: '',
  userPwd: '',
})


const login = () => {
  userLogin(loginData).then((res) => {
    if (res.code == 200 && res.data.token) {
      userStore.setToken(res.data.token)
      userStore.setUserData(res.data)

      router.push('/')
    }
  })
}
</script>

<style lang="scss" scoped></style>
