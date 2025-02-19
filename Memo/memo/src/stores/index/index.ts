import { defineStore  } from "pinia";
import type { CatalogType, MenoType } from "./type";
import { geneId, localGetItem, localSetItem } from '@/utils'
const indexStore = defineStore('index', {
  state: () =>({
    catalogs: [] as CatalogType[],        // 文件夹列表
    menos: [] as MenoType[],    // 备忘录列表
    active_cataid: null as number | null,   // 当前文件夹 id
    active_menoid: null as number | null    // 当前备忘录 id
  }),
  actions: {
    // 获取目录列表
    getCatalogs(){
      let data = localGetItem('catalogs')
      if(data) {
        this.catalogs = data
      }
    },
    // 获取备忘录列表
    getMenos(){
      let data = localGetItem('menos')
      if(data) {
        this.menos = data
      }
    },
    // 创建备忘录列表
    createMenos(val: any) {
      let meno =Object.assign({}, val, {
        meno_id: geneId(),
        updata_at: new Date().valueOf()
      })
      this.menos.push(meno)
      localSetItem('menos', this.menos)
    },
    // 设置备忘录 id
    setMenoId(id: number | null){
      this.active_menoid = id
      localSetItem('active_menoid', id)
    },
    // 设置文件夹 id
    setCataId(id: number | null) {
      this.active_cataid = id;
      localSetItem("active_cataid", id);
      if (this.activeMenos.length == 0) {
        this.setMenoId(null);
      } else {
        this.setMenoId(this.activeMenos[0].memo_id);
      }
    },
    // 创建文件夹方法
    // createCata(val: CatalogType){
    //   let curcata = Object.assign({}, val, {
    //     cata_id: geneId()
    //   })
    //   this.catalogs.push(curcata)
    //   localSetItem('catalogs_name',this.catalogs)
    // },
    createCata(val: Pick<CatalogType, "user_id" | "cata_name">) {
      let curcata = Object.assign({}, val, {
        cata_id: geneId(),
      });
      this.catalogs.push(curcata);
      localSetItem("catalogs", this.catalogs);
    },
    getActiveId() {
      this.active_cataid = localGetItem("active_cataid");
      this.active_menoid = localGetItem("active_memoid");
    },
  },
  getters: {
    activeMenos: (state) => {
      return state.menos.filter((r) => r.cata_id == state.active_cataid)
    }
  }
})
export default indexStore 