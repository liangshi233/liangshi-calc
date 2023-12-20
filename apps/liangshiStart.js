import plugin from '../../../lib/plugins/plugin.js'
import { Restart } from '../../../plugins/other/restart.js'
import fs from 'node:fs'
import path from 'path'
import _ from 'lodash'
import LSconfig from '../components/LSconfig.js'

const _path = process.cwd()
const liangshiData = path.join(`${_path}/data`, 'liangshiData')
const files = ['cfg.js', 'cfg_system.js', 'ProfileDmg.js']
const miaoPaths = _.map(['config', 'config/system', 'models'], v => `${_path}/plugins/miao-plugin/${v}`)
const dataFiles = _.map(files, v => `${liangshiData}/${v}`)

export class allSetting extends plugin {
  constructor () {
    super({
      name: '插件初始化',
      dsc: '初始化',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?梁氏([，,])?启动([！!])?$',
          fnc: 'liangshiStart',
          permission: 'master'
        }, {
          reg: '^#?梁氏强制替换$',
          fnc: 'liangshiReplace',
          permission: 'master'
        }, {
          reg: '^#?梁氏(恢复|复)(原|原有|原来的)?配置(文件)?$',
          fnc: 'liangshiByebye',
          permission: 'master'
        }, {
          reg: '^#?(梁氏|liangshi)?(刷新|重置|初始化|更新)预设面板$',
          fnc: 'panelStart',
          permission: 'master'
        } /*,
          {
              reg: '^#?(梁氏|liangshi)开启重置版拓展$',
              fnc: 'resettingStart'
          } */
      ]
    })
    this.cfg = LSconfig.getConfig('user', 'config')
  }

  async init () {
    if (this.cfg.autoRefresh) {
      this.cpPanels()
      logger.mark('[liangshi]预设面板自动刷新完成')
      return true
    }
  }

  async liangshiReplace () {
    const liangshiFile = `${_path}/plugins/liangshi-calc/replace`
    _.each(dataFiles, (v, k) => {
      let filename = files[k]
      let miaofile = `${miaoPaths[k]}/${filename}`
      if (k > 0) {
        if (fs.existsSync(miaofile)) fs.unlinkSync(miaofile)
        fs.copyFileSync(`${liangshiFile}/${filename}`, miaofile)
      }
    })
    logger.mark('[liangshi]替换成功，本次替换未执行备份')
    await this.e.reply(`替换成功，${this.cfg.autoRestart ? '重启中,请稍后.' : '请手动重启以更新'}`, true)
    if (this.cfg.autoRestart) this.restartApp()
    return true
  }

  async liangshiStart () {
    /** 备份原文件，防止后悔 */
    if (!fs.existsSync(liangshiData)) fs.mkdirSync(liangshiData)

    const liangshiFile = `${_path}/plugins/liangshi-calc/replace`
    const checkFile = []
    _.each(dataFiles, (v, k) => {
      let filename = files[k]
      let miaofile = `${miaoPaths[k]}/${filename}`
      let isExist = fs.existsSync(v)
      if (!isExist) {
        logger.mark(`[liangshi]正在备份${filename}原文件`)
        fs.copyFileSync(miaofile, v)
        if (k > 0) {
          if (fs.existsSync(miaofile)) fs.unlinkSync(miaofile)
          fs.copyFileSync(`${liangshiFile}/${filename}`, miaofile)
        }
      } else {
        logger.mark(`[liangshi]${filename}已备份`)
      }
      checkFile.push(isExist)
    })

    let msg = ''
    if (_.every(checkFile, Boolean)) {
      msg = '您已经备份过了~请勿重复备份！若为更新后失效请先【#梁氏恢复配置】后再执行替换 或 使用【#梁氏强制替换】不备份直接进行替换'
    } else {
      msg = `已保存原配置文件至云崽根目录/data/liangshiData内！\n${this.cfg.autoRestart ? '等待bot' : '请重启机器人以启用梁氏！\n'}重启完成后发送【#喵喵设置】查看新设置！\n如果反悔了想恢复原来的请发送\n【#梁氏恢复配置】`
    }
    if (this.cfg.autoRestart) this.restartApp()
    await this.e.reply(msg, true)
    return true
  }

  async liangshiByebye () {
    /** 检查是否已备份 */
    if (!fs.existsSync(liangshiData)) {
      await this.e.reply('你似乎还没备份过哦~', true)
      return true
    }
    _.each(dataFiles, (v, k) => {
      let filename = files[k]
      let miaofile = `${miaoPaths[k]}/${filename}`
      if (fs.existsSync(v)) {
        logger.mark(`[liangshi]正在还原${filename}`)
        if (fs.existsSync(miaofile)) fs.unlinkSync(miaofile)
        fs.copyFileSync(v, miaofile)
        fs.unlinkSync(v)
      }
    })
    if (_.isEmpty(fs.readdirSync(liangshiData))) fs.rmdirSync(liangshiData)
    await this.e.reply('梁氏要跟你说拜拜啦~', true)
    return true
  }

  async panelStart () {
    this.cpPanels()
    await this.e.reply('预设面板刷新完成发送[#预设面板]查看预设面板指令', true)
    return true
  }

  cpPanels () {
    let panelPath = this.cfg.panelmodel
    if (!panelPath) {
      logger.mark('[liangshi]自动替换版本选择配置文件缺失，已自动选择默认版本替换')
      panelPath = 1
    }
    const liangshiPath = `${_path}/plugins/liangshi-calc/replace/data/0${panelPath}`
    const replaceFiles = [
      {
        liangshi: `${liangshiPath}/PlayerData/gs`,
        miao: `${_path}/data/PlayerData/gs`,
        type: '.json'
      }, {
        liangshi: `${liangshiPath}/PlayerData/sr`,
        miao: `${_path}/data/PlayerData/sr`,
        type: '.json'
      }
    ]

    _.each(replaceFiles, v => {
      let _files = fs.readdirSync(v.liangshi).filter(file => file.includes(v.type))
      _.each(_files, f => {
        fs.copyFileSync(`${v.liangshi}/${f}`, `${v.miao}/${f}`)
      })
    })

    // 删除历史遗留js
    const delFiles = ['预设替换', '预设面板']
    _.each(delFiles, v => {
      let file = `./plugins/example/${v}.js`
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
      }
    })
  }

  async restartApp () {
    Bot.logger.mark('重启成功,喵喵配置文件修改完成')
    setTimeout(() => this.restart(), 1000)
  }

  restart () {
    new Restart(this.e).restart()
  }
}
