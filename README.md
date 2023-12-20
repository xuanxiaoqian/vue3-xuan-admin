# vue3-xuan-admin使用文档

TODO: ...

搜索栏跳转外部网站代码需要优化
```js
<el-option 
		v-for="route in routes" 
        :key="route.path" 
        :label="t(route.meta?.title as string)"
        :value="JSON.stringify(route)" />

  ...

  const route: RouteRecordRaw = JSON.parse(routeStr)

  ...
```