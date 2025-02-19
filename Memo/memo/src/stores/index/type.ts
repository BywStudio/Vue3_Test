export interface CatalogType {	// 文件夹类型
  cata_id: number;  // 文件夹 id
  user_id: number;  // 用户 id
  cata_name: string;  // 文件夹名称
}
export interface MenoType {		// 备忘录类型
  memo_id: number;  // 备忘录 id
  cata_id: number;  // 文件夹 id
  title: string;  // 备忘录标题
  content: string;  // 备忘录内容
  update_at: number   // 更新事件 
}