<script setup lang="ts" name="AdminLayout">
  import AppHeader from './AppHeader.vue'
  import Sidebar from './Sidebar.vue'
  import AppMain from './AppMain.vue'
  import AppFooter from './AppFooter.vue'

  import config from '@/config'
</script>

<template>
  <div class="admin-layout" h="full">
    <el-container h="full" bg="#f0f2f5">
      <el-header>
        <app-header />
      </el-header>
      <el-container style="height: calc(100vh - 60px)">
        <el-aside width="220px" shadow="card-dark">
          <sidebar />
        </el-aside>
        <el-container>
          <el-main>
            <app-main />
          </el-main>
          <el-footer v-if="config.APP.copyright">
            <app-footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  ::v-deep {
    .el-header {
      background-color: var(--el-color-primary);
    }
  }
</style>
