<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ElMessage } from 'element-plus';
import mock from '../../mock/mock'

const route = useRoute()
const router = useRouter()
const goodsData = ref([])

// 模拟分类数据
const categorys = ref([
  '全部', '男装', '女装'
])

// 筛选商品的参数
const queryParams = ref({
  name: '',
  id: '',
  category: '',
  sellMode: 2,  // 0 否, 1 是, 2 全部
  expMode: 2,   // 0 否, 1 是, 2 全部
})

// sellMode是否上架
const sellModeString = computed({
  get() {
    // 2 是全部上架
    if(queryParams.value.sellMode === 2){
      return '全部'
    } 
    return queryParams.value.sellMode === 0 ? '是' : '否'
  },
  set(val) {
    queryParams.value.sellMode = val
  }
})
// 
const expModeString = computed({
  get() {
    if(queryParams.value.expMode === 2) {
      return '全部'
    }
    return queryParams.value.expMode === 0 ? '是' : '否'
  },
  set(val) {
    queryParams.value.expMode = val
  }
})
// 组件更新时获取商品数据
onMounted(() => {
  goodsData.value = mock.getGoods(route.params.type)
})
// 获取数据的方法
function requestData() {
  ElMessage({
    type: 'success',
    message: '筛选请求参数: ' + JSON.stringify(queryParams.value)
  })
  goodsData.value = mock.getGoods(route.params.type)
}
// 进行上架、下架操作
function operate(item){
  item.state = !item.state
}
// 清空筛选项
function clear() {
  queryParams.value = {
    name: '',
    id: '',
    category: '',
    sellMode: 2,  // 0 否, 1 是, 2 全部
    expMode: 2,   // 0 否, 1 是, 2 全部
  }
  goodsData.value = mock.getGoods(route.params.type)
}
// 新增商品，跳转到新增商品的页面，待会再写新增商品的页面
function addGood(){
  router.push({ name: 'AddGoods', params: {type: route.params.type}})
}
</script>

<template>
  <div class="content-container">
    <div>
      <!-- input -->
      <el-container class="content-row">
        <div class="input-tip">
          商品名称:
        </div>
        <div class="input-field">
          <el-input v-model="queryParams.name"></el-input>
        </div>
        <div class="input-tip">
          商品编号:
        </div>
        <div class="input-field">
          <el-input v-model="queryParams.id"></el-input>
        </div>
        <div class="input-tip">
          商品分类:
        </div>
        <div class="input-field">
          <el-select v-model="queryParams.category" placeholder="请选择分类" style="width: 150px">
            <el-option v-for="item in categorys" :key="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">
          是否上架:
        </div>
        <div class="input-field">
          <el-select v-model="sellModeString" style="width: 150px">
            <el-option key="0" label="否" :value="0"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="2" label="全部" :value="2"></el-option>
          </el-select>
        </div>
        <div class="input-tip">
          是否过期:
        </div>
        <div class="input-field">
          <el-select v-model="expModeString" style="width: 150px">
            <el-option key="0" label="否" :value="0"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="2" label="全部" :value="2"></el-option>
          </el-select>
        </div>
      </el-container>
    </div>
    <!-- button -->
    <div class="content-row" style="margin-bottom: 20px;">
      <el-container>
        <el-button type="primary" @click="requestData">检索</el-button>
        <el-button type="primary" @click="clear">显示全部</el-button>
        <el-button type="success" @click="addGood">新增商品</el-button>
      </el-container>
    </div>
    <!-- list -->
    <div>
      <el-table
      :data="goodsData"
      tooltip-effect="dark"
      style="width: 100%">
        <el-table-column label="商品" width="100">
          <template #default="scope">
            <div style="text-align: center">
              <el-image :src="scope.row.img"></el-image>
            </div>
            <div style="text-align: center">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="100" prop="price"></el-table-column>
        <el-table-column label="销量" width="100" prop="sellCount"></el-table-column>
        <el-table-column label="库存" width="100" prop="count"></el-table-column>
        <el-table-column label="退款数量" width="100" prop="back"></el-table-column>
        <el-table-column label="退款金额" width="100" prop="backPrcie"></el-table-column>
        <el-table-column label="操作" width="100" prop="name">
          <template #default="scope">
            <el-button @click="operate(scope.row)" :type="scope.row.state ? 'danger': 'success' ">
              {{ scope.row.state ? '下架' : '上架' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="管理员" width="100" prop="owner"></el-table-column>
        <el-table-column label="更新时间" width="100" prop="time"></el-table-column>
      </el-table>
    </div>
  </div>

</template>

<style scoped>
  
</style>