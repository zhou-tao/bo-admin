import type { RouteComponent } from 'vue-router'
import type { AppRouteConfig } from '@/router/types'
import type { BuildMenuModel } from '@/api/_system/model/menuModel'
import { FakeLayout, PageLayout } from '@/router/constant'
import { alertErrMsg } from '@/utils/message'
import { ErrorCodeEnum } from '@/enums/httpEnum'
import { buildMenuApi } from '@/api/_system/menu'
import { defineStore } from 'pinia'

interface MenuState {
  routes: AppRouteConfig[]
}

type RawRouteComponent = RouteComponent | (() => Promise<RouteComponent>)

const pages = import.meta.glob('../../views/**/*.vue')

function componentMap(path: string): RawRouteComponent {
  switch (path) {
    case 'Layout':
      return PageLayout
    case 'Fake':
      return FakeLayout
    default: {
      const joinPath = `backstage/${path}`.replace(/\/\//, '/')
      return pages[`../../views/${joinPath}.vue`]
    }
  }
}

function mapRoutes(serverRoutes: BuildMenuModel[]): AppRouteConfig[] {
  const routes: any[] = serverRoutes.map(
    ({ name, redirect, component, children, ...rest }) => ({
      name: name ?? '',
      redirect: redirect ?? '',
      component: componentMap(component),
      ...(children?.length > 0 && { children: mapRoutes(children) }),
      ...rest
    })
  )
  return routes as AppRouteConfig[]
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    routes: []
  }),
  getters: {
    hasRoutes: state => state.routes.length > 0
  },
  actions: {
    async generateRoutes() {
      const serverRoutes = await buildMenuApi()
      try {
        this.routes = mapRoutes(serverRoutes)
      } catch (error) {
        alertErrMsg(ErrorCodeEnum.C100, '路由转化异常')
      }
    },
    clearRoutes() {
      this.$reset()
    }
  }
})
