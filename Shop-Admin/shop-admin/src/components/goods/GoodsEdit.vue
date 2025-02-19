<script setup>
import E from 'wangeditor' 
import { ref, onMounted, getCurrentInstance} from 'vue'

// 用来获取当前组件的实例
const instance = getCurrentInstance()
// 定义组件事件，内容改变时调用
const emit = defineEmits(['contentChange'])
// 编辑器对象引用
let editor = null
const editorContent = ref('')

// 组件加载时渲染
onMounted(() => {
  editor = new E(instance.proxy.$refs.editorElem)
  // 编辑器事件，每次改变时获取其 HTML 内容
  editor.config.onchange = contentChange
  // 编辑器菜单设置
  editor.config.menus = [
    'head', // 标题
    'bold', // 粗体
    'fontSize', // 字号
    'fontName', // 字体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'code', // 插入代码
    'undo', // 撤销
    'redo' // 重复
  ]
  // 创建富文本实例
  editor.create()
})
function contentChange(html) {
  // 此 html 的值就是在富文本编辑器中输入的内容，只要输入，就会转换为 html 
  editorContent.value = html
  emit('contentChange', editorContent.value)
  // console.log(html)
}
</script>

<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left;"></div>
  </div>
</template>

<style scoped>
  
</style>