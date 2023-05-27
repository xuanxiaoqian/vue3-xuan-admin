import enLocale from "element-plus/lib/locale/lang/en"
import zhLocale from "element-plus/lib/locale/lang/zh-cn"
import { createI18n } from 'vue-i18n'
import enUSJson from './en-US.json'
import zhCNJson from './zh-CN.json'

const messages = {
  'zh-CN': { ...zhCNJson, ...zhLocale },
  'en-US': { ...enUSJson, ...enLocale },
}

const i18n = createI18n({
  locale: localStorage.getItem('language') ?? (navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US'),
  legacy: false,
  messages,
})

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key

/**
 * 根据key进行国际化显示
 * @param key
 * @returns
 */
export const t = (key: string) => {
  let isI18n = true  // 开启i18n

  if (isI18n) {
    return i18n.global.t(key)
  }

  return key
}

/**
 * 使用函数科里化解决前缀key
 * @param curKey 前缀
 * @returns
 */
export const curT = (curKey: string) => {
  return (key: string) => {
    return t(`${curKey}.${key}`)
  }
}


/**
 * 修改网页标题
 * @param key 修改的key
 */
export const modifyHtmlTitle = (key: string) => {
  document.title = (t(key)) + ' - PUMS'
}

export default i18n
