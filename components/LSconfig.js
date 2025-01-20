import chokidar from 'chokidar'
import YAML from 'yaml'
import fs from 'node:fs'

const _path = process.cwd()

class LSconfig {
  constructor () {
    this.def = `${_path}/plugins/liangshi-calc/config/system/`
    this.defSet = {}

    this.user = `${_path}/plugins/liangshi-calc/config/`
    this.userSet = {}

    /** 监听文件 */
    this.watcher = { userSet: {}, defSet: {} }

    this.initCfg()
  }

  get preDownload () {
    return this.getConfig('def', 'PreDownload')
  }

  /**
   * 初始化配置文件
   */
  initCfg () {
    const file = 'config.yaml'
    if (!fs.existsSync(`${this.user}${file}`)) {
      fs.copyFileSync(`${this.def}${file}`, `${this.user}${file}`)
    }
    if (!fs.existsSync(this.user + 'ranking.js')) fs.copyFileSync(this.def + 'ranking_system.js', this.user + 'ranking.js')
    this.watch(`${this.user}${file}`, file.replace('.yaml', ''), 'userSet')
  }

  /**
   * 用户配置
   * @param {'def'|'user'} type 默认配置/用户配置
   * @param {string} name 文件名
   */
  getConfig (type, name) {
    const conf = this.getYaml(this.getFilePath(type), name)
    return conf
  }

  /**
   * 通用yaml读取
   * @param {string} path 路径
   * @param {string} name 文件名
   */
  getYaml (path, name) {
    const file = `${path}${name}.yaml`
    return fs.existsSync(file) ? YAML.parse(fs.readFileSync(file, 'utf8')) : {}
  }

  /**
   * 配置路径
   * @param {'def'|'user'} type 默认配置/用户配置
   */
  getFilePath (type) {
    return type === 'def' ? this.def : this.user
  }

  /**
   * 写入对应模块数据文件
   * @param {'def'|'user'} type 默认配置/用户配置
   * @param {string} name 文件名
   * @param {object} data 写入内容
   */
  writeData (type, name, data) {
    try {
      fs.writeFileSync(`${this.getFilePath(type)}${name}.yaml`, YAML.stringify(data), 'utf8')
    } catch (error) {
      logger.error(`[${name}] 写入失败 ${error}`)
      return false
    }
  }

  /**
   * 监听配置文件
   * @param {string} path 路径
   * @param {string} name 文件名
   * @param {'defSet'|'userSet'} type 默认配置/用户配置
   */
  watch (path, name, type = 'defSet') {
    if (this.watcher[type][name]) return

    const watcher = chokidar.watch(path)
    watcher.on('change', path => {
      delete this[type][name]
      logger.mark(`[liangshi_calc][修改配置文件][${type}][${name}]`)
      if (this[`change_${name}`]) {
        this[`change_${name}`]()
      }
    })
    this.watcher[type][name] = watcher
  }
}

export default new LSconfig()
