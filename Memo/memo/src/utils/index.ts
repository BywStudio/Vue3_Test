// 导入 dayjs 第三方包
import datjs from 'dayjs'

// 设置日期工具函数
export const FormatTime = (date: Date | string) => {
  return datjs(date).format('YYYY/MM/DD hh:mm')
}

// 编写从 localStorage 中获取和设置数据的函数, 在函数中自动处理 JSON 序列化 / 反序列化，方便在组件中与 localStorage 交互
// 1. 设置从获取 localStorage的数据，将其解析为 字符串格式
export const localGetItem = (key: string): any => {
  // 获取 key 
  let data_str = localStorage.getItem(key)
  // 将获取到的 data_str 的值做 JSON 反序列化为字符串
  if (data_str) {
    return JSON.parse(data_str)
  }
  // 如果不是则返回 null
  return null;
}

// 设置在 localStorage 中存储数据，如果是 字符串类型数据，则转换为 JSON 格式
export const localSetItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 编写一个生成随机数的函数，以便在创建备忘录和文件夹数据时生成唯一的 id
export const geneId = (): number => {
  return Math.floor(Math.random() * 939874)
}
