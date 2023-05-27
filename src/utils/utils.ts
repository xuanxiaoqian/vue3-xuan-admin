
/**
 * 获得dateTime格式时间离现在还有多少秒 用于订单倒计时
 * @param dateString
 * @returns
 */
export function getSecondsUntilDate(dateString: string): number {
  const date = new Date(dateString)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  return Math.round(diff / 1000)
}


/**
 * 用于获得指定分钟之后的时间戳
 * @param minutes
 * @returns
 */
export const getTimeAfterMinutes = (minutes: number): number => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + minutes)

  return date.getTime()
}


/**
 * 复制指定文本到粘贴板,兼容http作用域
 * @param textToCopy 需要复制的文字
 * @returns
 */
export const copyToClipboard = (textToCopy: string) => {
  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(textToCopy)
  } else {
    // 创建text area
    let textArea = document.createElement("textarea")
    textArea.value = textToCopy
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute"
    textArea.style.opacity = '0'
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res(1) : rej()
      textArea.remove()
    })
  }
}