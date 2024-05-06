import common from '../../../lib/common/common.js'
import gsCfg from '../../genshin/model/gsCfg.js'
import fs from 'node:fs'
import _ from 'lodash'

export class GS extends plugin {
  constructor () {
    super({
      name: '角色资源',
      dsc: '角色资源',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#*(.*)(收益曲线|角色介绍|介绍|角色海报|海报|角色封面|封面|侧头像|证件照|立绘|名片|普通攻击|元素战技|元素爆发|cv)(帮助)?$',
          fnc: 'GS'
        }
      ]
    })

    this.liangshi = './plugins/liangshi-calc/resources'
    this.img = './plugins/miao-plugin/resources/meta-gs/character'

    this.resMap = {
      收益曲线: {
        img: `${this.liangshi}/curveimg`,
        json: `${this.liangshi}/imgConfig/curve.json`
      },
      角色介绍: {
        img: `${this.liangshi}/introduceimg`,
        json: `${this.liangshi}/imgConfig/introduce.json`
      },
      角色海报: {
        img: `${this.liangshi}/posterimg`,
        json: `${this.liangshi}/imgConfig/poster.json`
      },
      角色封面: {
        img: `${this.liangshi}/coverimg`,
        json: `${this.liangshi}/imgConfig/cover.json`
      },
      普通攻击: {
        img: `${this.liangshi}/attackimg`,
        json: `${this.liangshi}/imgConfig/attack.json`
      },
      元素战技: {
        img: `${this.liangshi}/skillimg`,
        json: `${this.liangshi}/imgConfig/skill.json`
      },
      元素爆发: {
        img: `${this.liangshi}/outbreakimg`,
        json: `${this.liangshi}/imgConfig/outbreak.json`
      },
      cv: {
        img: `${this.liangshi}/cvimg`,
        json: `${this.liangshi}/imgConfig/cv.json`
      },
      名片: 'card',
      立绘: 'splash',
      侧头像: 'side',
      证件照: 'face'
    }
  }

  // 初始化
  async init () {
    let imgPaths = [..._.map(this.resMap, 'img'), `${this.liangshi}/ReferencPanel`]
    _.compact(imgPaths).forEach(path => {
      if (!fs.existsSync(path)) fs.mkdirSync(path)
    })
  }

  async GS () {
    let role = {}
    if (/#?收益曲线帮助/.test(this.e.msg)) role.name = '帮助'
    else role = gsCfg.getRole(this.e.msg, '收益曲线|角色介绍|介绍|角色海报|海报|角色封面|封面|侧头像|证件照|立绘|名片|普通攻击|元素战技|元素爆发|cv')

    if (!role) return logger.error('指令可能错误', role)

    let type = _.find(_.keys(this.resMap), v => this.e.msg.includes(v.replace('角色', '')))
    if (!type) type = '？'

    /** 主角特殊处理 */
    if (['10000005', '10000007', '20000000'].includes(String(role.roleId))) {
      let travelers = ['风主', '岩主', '雷主', '草主', '水主']
      if (!travelers.includes(role.alias)) {
        await this.e.reply(`请选择：${travelers.map(v => v + type).join('、')}`)
        return
      } else role.name = role.alias
    }

    if (this.resMap[type]) {
      let imgPath
      if (this.resMap[type].json) {
        let json = JSON.parse(fs.readFileSync(this.resMap[type].json, 'utf8'))
        if (!json[role.name]) return this.e.reply(`暂无该角色${type}图片`)

        imgPath = `${this.resMap[type].img}/${role.name}.png`
        if (!fs.existsSync(imgPath)) await this.getImg(json[role.name], imgPath)
      } else imgPath = `${this.img}/${role.name}/imgs/${type}.webp`

      if (fs.existsSync(imgPath)) {
        await this.e.reply(segment.image(imgPath))
        return true
      }
    } else await this.e.reply(`${role.name}？`)
  }

  // 下载图片
  async getImg (name, Path) {
    logger.mark(`${this.e.logFnc} 下载${name}素材图`)
    if (!await common.downFile(name, Path)) return false

    logger.mark(`${this.e.logFnc} 下载${name}素材成功`)
    return true
  }
}
