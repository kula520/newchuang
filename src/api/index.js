
import axios from './network'

// 登录
export const loginAxios = (name, password, captchaKey, code) => axios.post('login', {
  name,
  password,
  captchaKey,
  code
})
// 获取项目列表
export const projectList = (params) => axios.get('project/list', {params})
// 获取获取默认项目ID
export const projectSet = (params) => axios.get('project/set', {params})

// 添加项目
export const addProject = (
  name,
  code,
  referred,
  company,
  province,
  address,
  type,
  mod,
  signing_time,
  contact_amount,
  progress,
  head,
  tel,
  Introduction,
  data_quality_my,
  data_quality_party,
  srid
) => axios.post('add/project', {
  name,
  code,
  referred,
  company,
  province,
  address,
  type,
  mod,
  signing_time,
  contact_amount,
  progress,
  head,
  tel,
  Introduction,
  data_quality_my,
  data_quality_party,
  srid
})
// 修改项目
export const updateProject = (
  id,
  name,
  code,
  referred,
  company,
  province,
  address,
  type,
  mod,
  signing_time,
  contact_amount,
  progress,
  head,
  tel,
  Introduction,
  srid,
  data_quality_my,
  data_quality_party
) => axios.post('update/project', {
  id,
  name,
  code,
  referred,
  company,
  province,
  address,
  type,
  mod,
  signing_time,
  contact_amount,
  progress,
  head,
  tel,
  Introduction,
  srid,
  data_quality_my,
  data_quality_party
})

// 获取二维码列表
export const codeList = (params) => axios.get('/code/list', {params})
// 批量生成二维码
export const batchCode = (params) => axios.get('/batch/code', {params})
// 删除二维码列表
export const codeDelete = (params) => axios.get('code/del', {params})
// 批量下载
export const codeLoad = (params) => axios.get('code/load', {params})

// 获取分类树状图
export const getClassifications = (params) => axios.get('get/classifications', {params})
// 添加分类
export const addAlassification = (
  type,
  name,
  code,
  parent_id,
  gis_name,
  unit,
  img,
  order,
  category,
  note,
  level
) => axios.post('add/classification', {
  type,
  name,
  code,
  parent_id,
  gis_name,
  unit,
  img,
  order,
  category,
  note,
  level
})
// 修改分类
export const updataAlassification = (
  id,
  type,
  name,
  code,
  parent_id,
  gis_name,
  unit,
  img,
  order,
  category,
  attributes,
  note,
  level
) => axios.post('update/classification', {
  id,
  type,
  name,
  code,
  parent_id,
  gis_name,
  unit,
  img,
  order,
  category,
  attributes,
  note,
  level
})
// 删除分类
export const delClassifications = (params) => axios.get('del/classifications', {params})
// 获取属性类型（数据类型）
export const listType = (params) => axios.get('list/type', {params})

// 添加属性
export const addAttribute = (
  class_id,
  attributeIds
) => axios.post('add/attribute', {
  class_id,
  attributeIds
})
// 修改属性
export const updateAttribute = (
  id,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
) => axios.post('update/attribute', {
  id,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
})
// 获取分类属性详情（数据类型）
export const detailClassification = (params) => axios.get('detail/classification', {params})
// 获取资产列表
export const listAsset = (params) => axios.get('list/asset', {params})

// 获取资产列表
export const classList = (params) => axios.get('class/list', {params})

// 盘点（新增/暂存）资产
export const addAssetOne = (
  project_id,
  qr_id,
  category,
  name,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 设备分类大中小+
  equipment_big_class,
  equipment_middle_class,
  equipment_small_class,
  // 所属设施名称id
  belongs_asset,
  x,
  y,
  h,
  // 资产标识码
  asset_code,
  // 管网开始结束
  begin_asset,
  end_asset,
  status,
  imgs,
  position_type,
  class_id,
  arrAttributes,
  user_id,
  type,
  class_type,
  positionArray,
  json_code,
  note
) => axios.post('add/asset', {
  project_id,
  qr_id,
  category,
  name,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 设备分类大中小
  equipment_big_class,
  equipment_middle_class,
  equipment_small_class,
  // 所属设施名称id
  belongs_asset,
  x,
  y,
  h,
  // 资产标识码
  asset_code,
  // 关联开始结束
  begin_asset,
  end_asset,
  status,
  imgs,
  position_type,
  class_id,
  arrAttributes,
  user_id,
  type,
  class_type,
  positionArray,
  json_code,
  note
})
// 修改资产
export const modilyAssetOne = (
  id,
  project_id,
  qr_id,
  category,
  name,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 设备分类大中小
  equipment_big_class,
  equipment_middle_class,
  equipment_small_class,
  // 所属设施名称id
  belongs_asset,
  x,
  y,
  h,
  // 资产标识码
  asset_code,
  // 关联开始结束
  begin_asset,
  end_asset,
  status,
  imgs,
  position_type,
  class_id,
  arrAttributes,
  user_id,
  type,
  class_type,
  positionArray,
  json_code,
  note
) => axios.post('update/asset', {
  id,
  project_id,
  qr_id,
  category,
  name,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 设备分类大中小
  equipment_big_class,
  equipment_middle_class,
  equipment_small_class,
  // 所属设施名称id
  belongs_asset,
  x,
  y,
  h,
  // 资产标识码
  asset_code,
  // 关联开始结束
  begin_asset,
  end_asset,
  status,
  imgs,
  position_type,
  class_id,
  arrAttributes,
  user_id,
  type,
  class_type,
  positionArray,
  json_code,
  note
})
// 盘点关联资产
export const addAssetGl = (
  project_id,
  category,
  name,
  begin_asset,
  end_asset,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 资产标识码
  asset_code,
  status,
  imgs,
  class_id,
  arrAttributes,
  type,
  user_id,
  class_type,
  belongs_asset,
  x,
  y,
  h,
  positionArray,
  json_code,
  note
) => axios.post('add/asset', {
  project_id,
  category,
  name,
  begin_asset,
  end_asset,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 资产标识码
  asset_code,
  status,
  imgs,
  class_id,
  arrAttributes,
  type,
  user_id,
  class_type,
  belongs_asset,
  x,
  y,
  h,
  positionArray,
  json_code,
  note
})

// 修改盘点关联资产
export const modilyAssetGl = (
  id,
  project_id,
  category,
  name,
  begin_asset,
  end_asset,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 所属设施名称-暂时没有
  // 资产标识码
  asset_code,
  status,
  imgs,
  class_id,
  arrAttributes,
  type,
  user_id,
  class_type,
  belongs_asset,
  x,
  y,
  h,
  positionArray,
  json_code,
  note
) => axios.post('update/asset', {
  id,
  project_id,
  category,
  name,
  begin_asset,
  end_asset,
  // 设施分类大中小,
  facilities_big_class,
  facilities_middle_class,
  facilities_small_class,
  // 所属设施名称-暂时没有
  // 资产标识码
  asset_code,
  status,
  imgs,
  class_id,
  arrAttributes,
  type,
  user_id,
  class_type,
  belongs_asset,
  x,
  y,
  h,
  positionArray,
  json_code,
  note
})

// 删除资产
export const delAsset = (params) => axios.get('del/asset', {params})
// 资产详情
export const infoAsset = (params) => axios.get('info/asset', {params})

// 上传图片
export const uploadFile = (
  name,
  url
) => axios.post('upload/file', {
  name,
  url
})


// 上传文件
export const uploadImg = (
  file
) => axios.post('upload/img', {
  file
})
// 上传头像
export const ossImg = (
  file,
  dir
) => axios.post('oss/img', {
  file,
  dir
})

// 获取关联数据列表
export const relatedAsset = (params) => axios.get('related/asset', {params})
// 获取图片列表
export const imgsAsset = (params) => axios.get('imgs/asset', {params})
// 审核通过
export const auditAsset = (
  id,
  user_id,
  status,
  text
) => axios.post('audit/asset', {
  id,
  user_id,
  status,
  text
})
// 管理员列表
export const listAdmin = (params) => axios.get('list/admin', {params})
// 添加管理员
export const addAdmin = (
  name,
  password,
  password_confirmation,
  tel,
  role,
  projects,
  area_id,
  user_id
) => axios.post('add/admin', {
  name,
  password,
  password_confirmation,
  tel,
  role,
  projects,
  area_id,
  user_id
})
// 修改管理员
export const updateAdmin = (
  id,
  name,
  password,
  tel,
  role,
  projects,
  avatar
) => axios.post('update/admin', {
  id,
  name,
  password,
  tel,
  role,
  projects,
  avatar
})
// 审核通过
export const bingUser = (
  admin_id,
  user_id
) => axios.post('bing/user', {
  admin_id,
  user_id
})
// 获取工作人员列表
export const listUser = (params) => axios.get('list/user', {params})
// 未绑定工作人员列表
export const noBindUser = (params) => axios.get('no/bind/user', {params})


// 绑定工作人员
export const projectUser = (
  projects,
  user_id
) => axios.post('project/user', {
  projects,
  user_id
})

// 资产采集情况
export const projectAssetsCount = (params) => axios.get('project/assets/count', {params})
// 分类资产排名
export const projectAssetsRanking = (params) => axios.get('project/assets/ranking', {params})
// 待审核列表
export const projectAssetsAudit = (params) => axios.get('project/assets/audit', {params})
// 盘点次数统计
export const projectAssetsNumber = (params) => axios.get('project/assets/number', {params})
// 删除属性
export const delAssetAttribute = (
  class_id,
  attribute_name_id
) => axios.post('del/attribute', {
  class_id,
  attribute_name_id
})
// 获取菜单列表
export const menuList = (params) => axios.get('list/menu', {params})
// 删除菜单
export const menuDel = (params) => axios.get('del/menu', {params})
// 添加菜单
export const menuAdd = (
  parent_id,
  name,
  url,
  type,
  order
) => axios.post('add/menu', {
  parent_id,
  name,
  url,
  type,
  order
})
// 编辑菜单
export const menuUpdate = (
  id,
  parent_id,
  name,
  url,
  type,
  order
) => axios.post('update/menu', {
  id,
  parent_id,
  name,
  url,
  type,
  order
})
// 获取权限列表
export const powerList = (params) => axios.get('permissions/list', {params})
// 删除权限
export const powerDel = (params) => axios.get('permissions/del', {params})
// 添加权限
export const powerAdd = (
  parent_id,
  name,
  http_path,
  slug
) => axios.post('permissions/add', {
  parent_id,
  name,
  http_path,
  slug
})
// 编辑权限
export const powerUpdate = (
  id,
  parent_id,
  name,
  http_path,
  slug
) => axios.post('permissions/update', {
  id,
  parent_id,
  name,
  http_path,
  slug
})
// 获取角色列表
export const roleList = (params) => axios.get('role/list', {params})
// 删除角色
export const roleDel = (params) => axios.get('role/del', {params})
// 角色详情
export const roleInfo = (params) => axios.get('role/info', {params})
// 添加角色
export const roleAdd = (
  name,
  slug,
  menus,
  permissions
) => axios.post('add/role', {
  name,
  slug,
  menus,
  permissions
})
// 编辑角色
export const roleUpdate = (
  id,
  name,
  slug,
  menus,
  permissions
) => axios.post('update/role', {
  id,
  name,
  slug,
  menus,
  permissions
})
// 获取账号信息
export const adminInfo = (params) => axios.get('info/admin', {params})
// 盘点次数统计
export const sectionAssets = (params) => axios.get('section/assets', {params})


// 信息完整程度
export const attributeComplete = (params) => axios.get('attribute/complete', {params})

// 审核详细程度
export const attributeAccurate = (params) => axios.get('attribute/accurate', {params})
// 用户拥有项目
export const userProject = (params) => axios.get('user/project', {params})

// 批量删除
export const batchDel = (params) => axios.get('batch/del', {params})

// 工作人员资产统计
export const userCollect = (params) => axios.get('user/collect', {params})

// 获取顺序码
export const orderCode = (params) => axios.get('order/code', {params})
// 消息列表
export const userMessages = (params) => axios.get('user/messages', {params})

// 区域列表
export const listAreas = (params) => axios.get('list/areas', {params})
// 添加区域
export const addArea = (
  name,
  project_id
) => axios.post('add/area', {
  name,
  project_id
})
// 修改区域
export const updateAreas = (
  id,
  name,
  project_id
) => axios.post('update/areas', {
  id,
  name,
  project_id
})
// 删除区域
export const delArea = (params) => axios.get('del/area', {params})

// 項目詳情
export const projectInfo = (params) => axios.get('project/info', {params})

// 验证码
export const imgCode = (params) => axios.get('img/code', {params})

// 设置模板
export const setOften = (
  project_id,
  id,
  name
) => axios.post('set/often', {
  project_id,
  id,
  name
})
// 模板列表
export const oftenLList = (params) => axios.get('often/list', {params})

export const delOften = (params) => axios.get('del/often', {params})
export const infoOften = (params) => axios.get('info/often', {params})
export const updateOften = (
  project_id,
  id,
  name
) => axios.post('update/often', {
  project_id,
  id,
  name
})

export const batchAssets = (
  status,
  ids
) => axios.post('batch/assets', {
  status,
  ids
})

export const upCreator = (
  id,
  user_id
) => axios.post('up/creator', {
  id,
  user_id
})

// 批量刪除資產
export const batchDels = (
  ids
) => axios.post('batch/del', {
  ids
})

export const batchDelOften = (
  ids
) => axios.post('batch/del/often', {
  ids
})

// 获取stsToken
export const aliSts = (params) => axios.get('ali/sts', {params})

// 获取属性列表
export const attributeAllList = (params) => axios.get('attribute/all', {params})
// 添加属性
export const insertAttribute = (
  attribute_code,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
) => axios.post('insert/attribute', {
  attribute_code,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
})

// 修改属性
export const saveAttribute = (
  id,
  attribute_code,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
) => axios.post('save/attribute', {
  id,
  attribute_code,
  name,
  category,
  type,
  values,
  sort,
  slug,
  describe,
  field_type,
  field_length,
  pleasehold
})

// 批量生成模板
export const batchAddOften = (
  id,
  project_id,
  num
) => axios.post('batch/add/often', {
  id,
  project_id,
  num
})
// Gis属性计算
export const gisCla = (
  srid,
  startX,
  startY,
  endX,
  endY
) => axios.post('gis/cla', {
  srid,
  startX,
  startY,
  endX,
  endY
})
// 添加属性
export const addttValue = (
  attNameId,
  attValue
) => axios.post('add/attValue', {
  attNameId,
  attValue
})
// 修改属性
export const updateAttValue = (
  attValueId,
  attValue
) => axios.post('update/attValue', {
  attValueId,
  attValue
})
// 删除属性
export const delAttValue = (
  attValueId
) => axios.post('del/attValue', {
  attValueId
})
// 分类排序
export const classAttSort = (
  classId,
  attSort
) => axios.post('class/attSort', {
  classId,
  attSort
})
// 获取顺序吗
export const assetCode = (
  project_id,
  category,
  type,
  class_id,
  belongs_asset
) => axios.post('asset/code', {
  project_id,
  category,
  type,
  class_id,
  belongs_asset
})