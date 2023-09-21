import fs from 'fs'
import lodash from 'lodash'
import fetch from 'node-fetch'
import { segment } from 'oicq'
import { exec } from 'child_process'
import { Cfg , Common, Data } from '../components/index.js'
import plugin from '../../../lib/plugins/plugin.js'

const _path = process.cwd()
const pluginPath = `${_path}/plugins/liangshi-calc`
const opPath = `${_path}/plugins/liangshi-calc/resources/`

export class op extends plugin {
  constructor () {
    super(
       {
      name: 'OP',
      dsc: '随机OP',
      event: 'message',
      priority: 50000,
      rule: [
       /*{
          reg: '^#*(随机)?(op|Op|oP|OP|o批|O批|原p|原P)$',
          fnc: 'op'
        },
        {
          reg: '^#*(随机)?(qp|Qp|qP|QP|q批|Q批|穹p|穹P)$',
          fnc: 'qp'
        },
        {
          reg: '^#*(强制)?更新(op|Op|oP|OP|o批|O批|原p|原P|qp|Qp|qP|QP|q批|Q批|穹p|穹P)$',
          fnc: 'gxp'
        }*/
        //什么？你问为什么被注释掉了？  库被封了 XD
      ]
    }
   )
  }

  async op (e) {
    let file = pluginPath + '/resources/op/op/'
    let number = Math.floor(Math.random() * ( 25 - 1 ) + 1 )
    e.reply(segment.image(file + number.toString() + '.gif'))
    return true
  }

  async qp (e) {
    let file = pluginPath + '/resources/op/qp/'
    let number = Math.floor(Math.random() * ( 25 - 1 ) + 1 )
    e.reply(segment.image(file + number.toString() + '.gif'))
    return true
  }

  async gxp (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能更新哦~
      (*/ω＼*)`)
      return false
    }
    let isForce = e.msg.includes('强制')
    let command = ''
    if (fs.existsSync(`${opPath}/resources/op/`)) {
      e.reply('开始尝试更新，请耐心等待~')
      command = 'git pull'
      if (isForce) {
        command = 'git  checkout . && git  pull'
      }
      exec(command, { cwd: `${opPath}/resources/op/` }, function (error, stdout, stderr) {
        console.log(stdout)
        if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
          e.reply('目前所有OP或QP都已经是最新了~')
          return true
        }
        let numRet = /(\d*) files changed,/.exec(stdout)
        if (numRet && numRet[1]) {
          e.reply(`报告主人，更新成功，此次更新了${numRet[1]}个OP或QP~`)
          return true
        }
        if (error) {
          e.reply('更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('OP或QP图片更新成功~')
        }
      })
    } else {
      command = `git clone https://gitee.com/liangshi233/op.git "${opPath}/op/" --depth=1`
      e.reply('开始尝试安装OP或QP图片，可能会需要一段时间，请耐心等待~')
      exec(command, function (error, stdout, stderr) {
        if (error) {
          e.reply('OP或QP图片安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('OP或QP图片包安装成功！您后续也可以通过 #更新OP 命令来更新OP或QP\n如果您有想共享OP或QP图片，欢迎上传至库中')
        }
      })
    }
    return true
  }

}
