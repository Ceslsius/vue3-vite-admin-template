<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2021-03-11 11:42:34
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-29 09:44:55
-->
<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="setSidebar(!sidebar)"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown>
        <div class="avatar-wrapper">
          <span class="mr-5">{{ username }}</span>
          <!-- <el-image class="user-avatar" :src="avatar" fit="contain">
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image> -->
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="logout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { useSidebar } from '@/use/useSidebar'
import { adminStorage } from '@/utils'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
  },
  setup() {
    const { sidebar, setSidebar } = useSidebar()
    const username = adminStorage.getItem('username')
    const router = useRouter()
    const route = useRoute()

    function logout() {
      adminStorage.delete('token')
      adminStorage.delete('uid')
      adminStorage.delete('username')
      router.replace({
        path: '/login',
        query: {
          redirect: route.fullPath,
        },
      })
    }
    return {
      sidebar,
      setSidebar,
      logout,
      username,
    }
  },
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 30px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
