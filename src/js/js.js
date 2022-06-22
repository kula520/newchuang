// 常量的定义
const config = {}
// 函数的定义
function unique (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i].id == arr[j].id) { // 第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
// 导出 {常量名、函数名}
export {config, unique}
