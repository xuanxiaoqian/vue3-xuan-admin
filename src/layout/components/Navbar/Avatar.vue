<template>
  <div c-title="用户个人信息" class="avatar">
    <el-dropdown>
      <div class="flex max-w-[200px] cursor-pointer items-center justify-center p-3 duration-300 hover:bg-[#f8f8f9]">
        <el-avatar :size="30" :src="userStore.userAvatar" class="flex-shrink-0">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            width="30"
            height="30"
            alt="用户头像"
          />
        </el-avatar>

        <span class="ml-2 truncate text-[14px]">{{ userStore.userNickname }}</span>
      </div>

      <template #dropdown>
        <div class="py-2">
          <el-dropdown-item :icon="SwitchButton" @click="logout">{{ $('outLogin') }}</el-dropdown-item>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { curT } from '@/i18n'
import { useUserStore } from '@/store/modules/user'
import { SwitchButton } from '@element-plus/icons-vue'

const $ = curT('layout.navbar.Avatar')

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.resetAllUserData()
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
