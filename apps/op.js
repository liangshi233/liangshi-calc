import fs from 'fs'
import lodash from 'lodash'
import fetch from 'node-fetch'
import { segment } from 'oicq'
import { exec } from 'child_process'
import { Cfg , Common, Data } from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js'

const _path = process.cwd()
const pfPath = `${_path}`

export class pf extends plugin {
  constructor () {
    super(
       {
      name: 'pf',
      dsc: '评分拓展',
      event: 'message',
      priority: 50000,
      rule: [
       /*{
          reg: '^#*梁氏(强制)?更新评分$',
          fnc: 'gxp'
        }*/
      ]
    }
   )
  }


  async gxp (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能更新哦~
      (*/ω＼*)`)
      return false
    }
    let isForce = e.msg.includes('强制')
    let command = ''
    if (fs.existsSync(`${pfPath}`)) {
      e.reply('开始尝试更新，请耐心等待~')
      command = 'git pull'
      if (isForce) {
        command = 'git  checkout . && git  pull'
      }
      exec(command, { cwd: `${pfPath}` }, function (error, stdout, stderr) {
        console.log(stdout)
        if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
          e.reply('目前所有评分内容都已经是最新了~')
          return true
        }
        let numRet = /(\d*) files changed,/.exec(stdout)
        if (numRet && numRet[1]) {
          e.reply(`报告主人，更新成功，此次更新了${numRet[1]}个评分内容~`)
          return true
        }
        if (error) {
          e.reply('更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('评分拓展更新成功~')
        }
      })
    } else {
      command = `git clone https://github.com/liangshi233/plugins.git --depth=1`
      e.reply('开始尝试安装评分拓展模块，可能会需要一段时间，请耐心等待~')
      exec(command, function (error, stdout, stderr) {
        if (error) {
          e.reply('角色评分拓展模块安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('角色评分拓展模块安装成功！您后续也可以通过 #梁氏更新评分 命令来更新评分拓展')
        }
      })
    }
    return true
  }

}
