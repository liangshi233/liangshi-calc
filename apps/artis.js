import fs from 'fs'
import lodash from 'lodash'
import fetch from 'node-fetch'
import { segment } from 'oicq'
import { exec } from 'child_process'
import { Cfg , Common, Data } from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js'

const _path = process.cwd()
const pluginPath = `${_path}/plugins/miao-plugin`
const pfPath = `${_path}/plugins/miao-plugin`

export class pf extends plugin {
  constructor () {
    super(
       {
      name: 'pf',
      dsc: '评分拓展',
      event: 'message',
      priority: 50000,
      rule: [
/*      {
          reg: '^#*梁氏(更新|安装)原神评分$',
          fnc: 'qr'
        },
        {
          reg: '^#*确认(更新|安装)原神评分$',
          fnc: 'azp'
        },
        {
          reg: '^#*取消更新$',
          fnc: 'qx'
        }*/
      ]
    }
   )
  }

  async qr (e) {
    await this.reply(`您确认要更新原神评分吗？\n此操作会替换您原本的原神评分和面板展示布局\n建议在本操作前备份以下文件\n plugins/miao-plugin/resources/character/profile-detail.html \n plugins/miao-plugin/resources/meta/character中您更改过的artis.js \n profile-detail.html的替换仅用于反馈时版本信息的收集\n若您未安装过本拓展请先执行安装，请勿执行更新指令，避免后续无法更新\n如果您能确认自己的操作请输入\n#确认安装原神评分 或 #确认更新原神评分\n如果您不能确认自己的操作请输入\n#取消更新`)
    return true
  }


  async qx (e) {
    await this.reply(`取消成功，本次更新操作已中断`)
    return true
  }

  async azp (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能更新哦~
      (*/ω＼*)`)
      return false
    }
    let isForce = e.msg.includes('更新')
    let command = ''
    let command1 = ''
    let command2 = ''
      command = `git init plugins/miao-plugin/resources`
      command1 = `cd plugins/miao-plugin/resources && git remote add origin https://gitee.com/liangshi233/resources.git`
//    gitee的寄了就把上面的注释了下面的取消注释
//    command1 = `cd plugins/miao-plugin/resources && git remote add origin https://github.com/liangshi233/resources.git`
      command2 = `cd plugins/miao-plugin/resources && git fetch origin master && git reset --hard origin/master`
      if (isForce) {
        command = 'cd plugins/miao-plugin/resources'
        command1 = 'cd plugins/liangshi-calc/apps'
      }
      e.reply('开始尝试安装评分拓展模块，可能会需要一段时间，请耐心等待~')
          let number = Math.random() * ( 24 - 1 ) + 1
          e.reply(`已完成${number}%`)
      exec(command, function (error, stdout, stderr) {
        if (error) {
          e.reply('角色评分拓展模块安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          number = Math.random() * ( 49 - 25 ) + 25
          e.reply(`已完成${number}%`)
      exec(command1, function (error, stdout, stderr) {
        if (error) {
          e.reply('角色评分拓展模块安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          number = Math.random() * ( 74 - 50 ) + 50
          e.reply(`已完成${number}%`)
      exec(command2, function (error, stdout, stderr) {
        if (error) {
          e.reply('角色评分拓展模块安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          number = Math.random() * ( 99 - 75 ) + 75
          e.reply(`已完成${number}%`)
          e.reply('角色评分拓展模块安装成功！您后续也可以通过 #梁氏更新评分 命令来更新评分拓展')
          }
         })
        }
       })
      }
     })
   return true
  }
}
