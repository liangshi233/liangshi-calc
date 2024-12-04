import fs from 'fs'
import { exec } from 'child_process'
import plugin from '../../../lib/plugins/plugin.js'
import LSconfig from '../components/LSconfig.js'

const _path = process.cwd()
const cfgL = LSconfig.getConfig('user', 'config')

export class calc extends plugin {
  constructor () {
    super(
       {
         name: 'calc',
         dsc: 'calc拓展',
         event: 'message',
         priority: 5000,
         rule: [
          {
            reg: '^#*(强制)?更新(.*)(崩坏三|崩坏3|崩三|崩3|原神|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|绝区零|绝|鸣潮|明朝|潮|幻塔|幻塔PSN|幻塔psn|战双|战双帕弥什|帕弥什|尘白|尘白禁区)(.*?)(计算|伤害计算)$',
            fnc: 'calc'
          }
        ]
      }
    )
  }

  async calc (e) {
    if (!e.isMaster) {
      e.reply(`只有主人才能更新哦~(*/ω＼*)`)
      return false
    }
    let isForce = e.msg.includes('强制')
    let calcdata = ''
    if (/原神|ys|YS|gs|GS/.test(this.e.msg)) {
      calcdata = 'gs'
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道/.test(this.e.msg)) {
      calcdata = 'sr'
    } else if (/鸣潮|明朝|潮/.test(this.e.msg)) {
      calcdata = 'mc'
    } else if (/绝区零|绝/.test(this.e.msg)) {
      calcdata = 'zzz'
    } else if (/崩坏三|崩坏3|崩三|崩3/.test(this.e.msg)) {
      calcdata = 'bh3'
    } else if (/幻塔PSN|幻塔psn/.test(this.e.msg)) {
      calcdata = 'htpsn'
    } else if (/幻塔/.test(this.e.msg)) {
      calcdata = 'ht'
    } else if (/战双|战双帕弥什|帕弥什/.test(this.e.msg)) {
      calcdata = 'pns'
    } else if (/尘白|尘白禁区/.test(this.e.msg)) {
      calcdata = 'cbjq'
    } else {
      calcdata = 'gs' //仅添加已支持的游戏，如有新的游戏可在issue中提出
    } //部分游戏可能需要安装相应插件才可使用且部分游戏可能拥有多个插件，请安装前注意插件名称
    let namedata = ''
    let gitdata = ''
    if (/更新(liangshi|梁氏|LS|Liangshi|ls)/.test(this.e.msg)) {
      gitdata = 'https://gitee.com/liangshi233'
      namedata = 'liangshi'
    } else if (/更新(ikun|Ikun)/.test(this.e.msg)) {
      gitdata = 'https://gitee.com/jntmtt'
      namedata = 'ikun'
    } else if (/更新(当前|已启用|使用中|默认|自定义)/.test(this.e.msg)) {
      namedata = cfgL.calcmodel
    } else {
     let webdata = e.msg.match(/^#*(强制)?更新(.*)(崩坏三|崩坏3|崩三|崩3|原神|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|绝区零|绝|鸣潮|明朝|潮|幻塔|幻塔PSN|幻塔psn|战双|战双帕弥什|帕弥什|尘白|尘白禁区)(.*?)(计算|伤害计算)$/)
     if (fs.existsSync(`${_path}/plugins/liangshi-calc/damage/${webdata[2]}-${calcdata}/`)) {
      namedata = `${webdata[2]}`
     } else {
      gitdata = `${webdata[2]}`
      namedata = `${webdata[4]}`
     } //部分游戏插件和部分作者的计算为私库状态，需要根据相应插件说明在此添加对应内容
    }
    let command = ''
    if (fs.existsSync(`${_path}/plugins/liangshi-calc/damage/${namedata}-${calcdata}/`)) {
      e.reply('开始尝试更新选定的计算，请耐心等待~')
      command = 'git pull'
      if (isForce) {
        command = 'git  checkout . && git  pull'
      }
      exec(command, { cwd: `${_path}/plugins/liangshi-calc/damage/${namedata}-${calcdata}/` }, function (error, stdout, stderr) {
        console.log(stdout)
        if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
          e.reply('目前选定的计算已经是最新了~')
          return true
        }
        let numRet = /(\d*) files changed,/.exec(stdout)
        if (numRet && numRet[1]) {
          e.reply(`更新成功，${numRet[1]}个计算被更新`)
          return true
        }
        if (error) {
          e.reply('更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('选定的计算更新成功~')
        }
      })
    } else {
      command = `git clone ${gitdata}/${namedata}-${calcdata}.git "${_path}/plugins/liangshi-calc/damage/${namedata}-${calcdata}" --depth=1`
      e.reply('开始尝试安装选定的计算，请稍候')
      exec(command, function (error, stdout, stderr) {
        if (error) {
          e.reply('计算安装失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
        } else {
          e.reply('[liangshi-calc]拓展计算包安装成功！')
        }
      })
    }
    return true
  }

}