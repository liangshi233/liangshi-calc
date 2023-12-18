import YAML from 'yaml'
import fs from 'node:fs'

const _path = process.cwd()

class LSconfig {
  constructor () {
    this.def = `${_path}/plugins/liangshi-calc/config/system/`
    this.user = `${_path}/plugins/liangshi-calc/config/`
  }

  get preDownload () {
    return this.getConfig('def', 'PreDownload')
  }

  /**
   * 用户配置
   * @param {'def'|'user'} type 默认配置/用户配置
   * @param {string} name 文件名
   */
  getConfig (type, name) {
    if (type === 'user') this.defSetCopy(name)
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
   * 默认拷贝到用户配置
   * @param {string} name YAMl文件名
   */
  defSetCopy (name) {
    name = `${name}.yaml`
    if (!fs.existsSync(this.user + name)) fs.copyFileSync(this.def + name, this.user + name)
  }
}

export default new LSconfig()
