import { Restart } from '../../../plugins/other/restart.js'
// import LSstart from '../components/LSstart.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'
import _ from 'lodash'

const _path = process.cwd()

export class allSetting extends plugin {
  constructor () {
    super({
      name: '梁氏预设面板',
      dsc: '梁氏预设面板初始化',
      event: 'message',
      priority: 5000,
      rule: [
        /*
        {
          reg: '^#?梁氏([，,])?启动([！!])?$',
          fnc: 'liangshiStart',
          permission: 'master'
        },
        */
        {
          reg: '^#?(梁氏|liangshi)?(刷新|重置|初始化|更新)预设面板$',
          fnc: 'panelStart',
          permission: 'master'
        }
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

  /*
  async liangshiStart() {
    this.cfg.calcLiang = true //todo 写入配置文件
    LSstart.start(true)
    await this.e.reply('欢迎使用梁氏', true)
    return true
  }
  */

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
    const liangshiPath = `${_path}/plugins/liangshi-calc/replace/data/${panelPath}`
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
