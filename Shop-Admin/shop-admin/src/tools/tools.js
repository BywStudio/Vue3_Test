const tools = {
  exportJson(name, data) {
    var blob = new Blob([data])  // 创建 blob 对象
    var link = document.createElement('a')
    link.href = URL.createObjectURL(blob) // 创建一个 URL 对象并传给 a 元素的 href 属性
    link.download = name  // 设置下载的默认文件名
    link.click()
  }
}

export default tools