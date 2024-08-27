import fs from 'node:fs'
import LSstart from './components/LSstart.js'

// 梁氏启动！
LSstart.init()

logger.info('------------QAQ------------')
logger.info('liangshi伤害计算加载成功')
logger.info('如有计算错误可通过 #计算反馈 反馈')
logger.info('---------------------------')
const files = fs.readdirSync('./plugins/liangshi-calc/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
