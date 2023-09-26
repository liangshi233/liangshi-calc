import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'
import path from 'path'
import _ from 'lodash'

const _path = process.cwd()
const liangshiData = path.join(`${_path}/data`, `liangshiData`)
const files = ['cfg.js', 'cfg_system.js', 'ProfileDmg.js']
const miaoPaths = _.map([`config`, `config/system`, `models`], (v) => `${_path}/plugins/miao-plugin/${v}`)
const dataFiles = _.map(files, (v) => `${_path}/data/liangshiData/${v}`)

export class allSetting extends plugin {
  constructor() {
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
        },
        {
          reg: '^#?梁氏(恢复|复)(原|原有|原来的)?配置(文件)?$',
          fnc: 'liangshiByebye',
          permission: 'master'
        },
        {
          reg: '^#?(梁氏|liangshi)?(刷新|重置|初始化|更新)预设面板$',
          fnc: 'panelStart',
          permission: 'master'
        } /*,
          {
              reg: '^#?(梁氏|liangshi)开启(武器|weapon|额外武器|测试武器)拓展$',
              fnc: 'weaponStart'
          },
          {
              reg: '^#?(梁氏|liangshi)开启(主角|角色|元素主角)拓展$',
              fnc: 'ysStart'
          }*/,
      ],
    })
  }

  async liangshiStart() {
    /** 备份原文件，防止后悔 */
    if (!fs.existsSync(liangshiData)) {
      fs.mkdirSync(liangshiData)
    }

    let liangshiFile = `${_path}/plugins/liangshi-calc/replace`
    let checkFile = []
    _.forEach(dataFiles, (v, k) => {
      let filename = files[k]
      let miaofile = `${miaoPaths[k]}/${filename}`
      let isExist = fs.existsSync(v)
      if (!isExist) {
        logger.info(`[liangshi]正在备份${filename}原文件`)
        fs.copyFileSync(miaofile, v)
        if (k > 0) {
          if (fs.existsSync(miaofile)) fs.unlinkSync(miaofile)
          fs.copyFileSync(`${liangshiFile}/${filename}`, miaofile)
        }
      } else {
        logger.info(`[liangshi]${filename}已备份`)
      }
      checkFile.push(isExist)
    })

    let msg = ''
    if (_.every(checkFile, Boolean)) {
      msg = `已经备份过了！请勿重复备份！`
    } else {
      msg = `已保存原配置文件至云崽根目录/data/liangshiData内！\n请重启机器人以启用梁氏！\n重启后发送【#喵喵设置】查看新设置！\n如果反悔了想恢复原来的请发送\n【#梁氏恢复配置】`
    }
    await this.e.reply(msg, true)
    return true
   
    /** 写入开关 */
    /* byd跟着readme多写的东西👇👇👇
        fs.readFile(`${_path}/plugins/miao-plugin/config/cfg.js`, 'utf8', function (err, data) {
            if (err) throw err;
            const teamLiang = `\n// 梁氏开关\nexport const teamLiang = true`;
            const position = data.indexOf('export const artisNumber = ');
            const endPosition = data.indexOf('\n', position);
            const newData = data.slice(0, endPosition + 1) + teamLiang + '\n' + data.slice(endPosition + 1);
            fs.writeFile(`${_path}/plugins/miao-plugin/config/cfg.js`, newData, function (err) {
                if (err) throw err;
            })
        })
        */
  }

  async liangshiByebye() {
    /** 检查是否已备份 */
    if (!fs.existsSync(liangshiData)) {
      await this.e.reply(`你似乎还没备份过哦~`, true)
      return true
    }
    _.forEach(dataFiles, (v, k) => {
      let filename = files[k]
      let miaofile = `${miaoPaths[k]}/${filename}`
      if (fs.existsSync(v)) {
        logger.info(`[liangshi]正在还原${filename}`)
        if (fs.existsSync(miaofile)) fs.unlinkSync(miaofile)
        fs.copyFileSync(v, miaofile)
        fs.unlinkSync(v)
      }
    })
    if (_.isEmpty(fs.readdirSync(liangshiData))) fs.rmdirSync(liangshiData)
    await this.e.reply(`梁氏要跟你说拜拜啦~`, true)    
    return true
  }

  async panelStart() {
    /** 定义 */
    //      const miaoFile0 = path.join(`${_path}/data/UserData`, `100000000.json`)
    const miaoFile1 = path.join(`${_path}/data/UserData`, `100000001.json`)
    const miaoFile2 = path.join(`${_path}/data/UserData`, `100000002.json`)
    const miaoFile3 = path.join(`${_path}/data/UserData`, `100000003.json`)
    const miaoFile4 = path.join(`${_path}/data/UserData`, `100000004.json`)
    const miaoFile5 = path.join(`${_path}/data/UserData`, `100000005.json`)
    const miaoFile6 = path.join(`${_path}/data/PlayerData/sr`, `100000000.json`)
    const miaoFile7 = path.join(`${_path}/plugins/example`, `预设面板.js`)
    const miaoFile8 = path.join(`${_path}/plugins/example`, `预设替换.js`)
    const miaoFile9 = path.join(`${_path}/data/UserData`, `100000000.json`)
    //      const liangshiFile0 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000000.json`)
    const liangshiFile1 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000001.json`)
    const liangshiFile2 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000002.json`)
    const liangshiFile3 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000003.json`)
    const liangshiFile4 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000004.json`)
    const liangshiFile5 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000005.json`)
    const liangshiFile6 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/PlayerData/sr`, `100000000.json`)
    const liangshiFile7 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01`, `预设面板.js`)
    const liangshiFile8 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01`, `预设替换.js`)
    const liangshiFile9 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000000.json`)
    /** 写入新配置 */
    fs.copyFile(liangshiFile1, miaoFile1, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile2, miaoFile2, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile3, miaoFile3, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile4, miaoFile4, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile5, miaoFile5, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile6, miaoFile6, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile7, miaoFile7, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile8, miaoFile8, (err) => {
      if (err) throw err
    })
    fs.copyFile(liangshiFile9, miaoFile9, (err) => {
      if (err) throw err
    })
    await this.e.reply(`预设面板刷新完成发送[#预设面板]查看预设面板指令`, true)
    return true
  }
}
