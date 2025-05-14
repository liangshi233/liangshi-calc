import plugin from '../../../lib/plugins/plugin.js'
import gsCfg from '../../genshin/model/gsCfg.js'
import fs from 'node:fs'

export class calc extends plugin {
  constructor () {
    super(
       {
         name: 'calc',
         dsc: '自定义calc拓展',
         event: 'message',
         priority: 50001,
         rule: [
          {
            reg: '^#*(重置|替换)(自定义|自定)?(计算|伤害计算|calc)为(全部|超全|队伍|组队|极简|简单|标准|基础)(模版)?$',
            fnc: 'CalcDell'
          },
          {
            reg: '^#*查看(计算|伤害计算|calc)模版(.*)$',
            fnc: 'InspectCalc'
          },
          {
            reg: '^#*(添加|增加|移除|去除|删除)(计算|伤害计算|calc)模版(.*)[0-9]{1,3}$',
            fnc: 'NewCalc'
          }
        ]
      }
    )
  }

  async CalcDell (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能设置哦~(*/ω＼*)`)
      return false
    }
    try {
      let name
      if (fs.existsSync('plugins/liangshi-calc/config/data/calc.json')) {
        fs.unlinkSync('plugins/liangshi-calc/config/data/calc.json')
      }
      if (/队伍|组队/.test(this.e.msg)) {
        name = "组队"
        fs.copyFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/TeamCalc.json', 'plugins/liangshi-calc/config/data/calc.json')
      } else if (/极简|简单/.test(this.e.msg)) {
        name = "极简"
        fs.copyFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/ConciseCalc.json', 'plugins/liangshi-calc/config/data/calc.json')
      } else if (/标准|基础/.test(this.e.msg)) {
        name = "基础"
        fs.copyFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/BasicCalc.json', 'plugins/liangshi-calc/config/data/calc.json')
      }
      return e.reply(`自定义伤害计算条目配置已重置为[预设${name}计算模板]\n重启后生效,需启用自定义计算`)
    } catch (err) {
      return e.reply(`重置失败：\n${err}\n请尝试手动重置`)
    }
  }

  async InspectCalc (e) {
    if (!fs.existsSync('plugins/liangshi-calc/config/data/calc.json')) {
      return e.reply(`当前还没有自定义计算模版`)
    }
    try {
      let data = JSON.parse(fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/config/calc.json', 'utf8'))
      if (/页/.test(this.e.msg)) {
        return e.reply(`分页查看正在施工中~`)
      } else {
        let name = gsCfg.getRole(this.e.msg, '#*查看(计算|伤害计算|calc)模版')
        let a = data[`${name.name}`]
        return e.reply(`角色${name.name}当前的配置为\n${a}`)
      }
    } catch (err) {
      return e.reply(`自定义计算模版打开失败或角色配置不存在\n${err}\n建议检查文件`)
    }
  }

  async NewCalc (e) {
    if (!e.isMaster) {
      return e.reply(`只有主人才能设置哦~(*/ω＼*)`)
    } else {
      return e.reply(`主人也不能设置哦~(*/ω＼*)`)
    }
  }

}