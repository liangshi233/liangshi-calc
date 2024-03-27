import plugin from '../../../lib/plugins/plugin.js'
import gsCfg from '../../genshin/model/gsCfg.js'
import { segment } from 'oicq'
import fs from 'node:fs'
import common from '../../../lib/common/common.js'

export class GS extends plugin {
  constructor() {
    super({
      name: '角色资源',
      dsc: '角色资源',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#*(.*)(收益曲线|角色介绍|介绍|角色海报|海报|角色封面|封面|侧头像|证件照|立绘|名片|普通攻击|元素战技|元素爆发)(帮助)?$',
          fnc: 'GS'
        }
      ]
    })

    this.img = './plugins/miao-plugin/resources/meta-gs/character'
    this.curvepath = './plugins/liangshi-calc/resources/curveimg'
    this.coverpath = './plugins/liangshi-calc/resources/coverimg'
    this.posterpath = './plugins/liangshi-calc/resources/posterimg'
    this.introducepath = './plugins/liangshi-calc/resources/introduceimg'
    this.ReferencPanelpath = './plugins/liangshi-calc/resources/ReferencPanel'
    this.attackpath = './plugins/liangshi-calc/resources/attackimg'
    this.skillpath = './plugins/liangshi-calc/resources/skillimg'
    this.outbreakpath = './plugins/liangshi-calc/resources/outbreakimg'

    this.json = './plugins/liangshi-calc/resources/imgConfig/curve.json'
    this.covjson = './plugins/liangshi-calc/resources/imgConfig/cover.json'
    this.posjson = './plugins/liangshi-calc/resources/imgConfig/poster.json'
    this.intjson = './plugins/liangshi-calc/resources/imgConfig/introduce.json'
    this.attjson = './plugins/liangshi-calc/resources/imgConfig/attack.json'
    this.skijson = './plugins/liangshi-calc/resources/imgConfig/skill.json'
    this.outjson = './plugins/liangshi-calc/resources/imgConfig/outbreak.json'

    this.curve = JSON.parse(fs.readFileSync(this.json, 'utf8'))
    this.cover = JSON.parse(fs.readFileSync(this.covjson, 'utf8'))
    this.poster = JSON.parse(fs.readFileSync(this.posjson, 'utf8'))
    this.introduce = JSON.parse(fs.readFileSync(this.intjson, 'utf8'))
    this.attack = JSON.parse(fs.readFileSync(this.attjson, 'utf8'))
    this.skill = JSON.parse(fs.readFileSync(this.skijson, 'utf8'))
    this.outbreak = JSON.parse(fs.readFileSync(this.outjson, 'utf8'))
  }

  //初始化
  async init() {
    if (!fs.existsSync(this.attackpath)) {
      fs.mkdirSync(this.attackpath)
    }
    if (!fs.existsSync(this.skillpath)) {
      fs.mkdirSync(this.skillpath)
    }
    if (!fs.existsSync(this.outbreakpath)) {
      fs.mkdirSync(this.outbreakpath)
    }
    if (!fs.existsSync(this.posterpath)) {
      fs.mkdirSync(this.posterpath)
    }
    if (!fs.existsSync(this.curvepath)) {
      fs.mkdirSync(this.curvepath)
    }
    if (!fs.existsSync(this.coverpath)) {
      fs.mkdirSync(this.coverpath)
    }
    if (!fs.existsSync(this.ReferencPanelpath)) {
      fs.mkdirSync(this.ReferencPanelpath)
    }
    if (!fs.existsSync(this.introducepath)) {
      fs.mkdirSync(this.introducepath)
    }
  }

  async GS() {
    let role = {}
    if (/#?(收益曲线)帮助/.test(this.e.msg)) {
      role.name = "帮助"
    } else {
      role = gsCfg.getRole(this.e.msg, '收益曲线|角色介绍|介绍|角色海报|海报|角色封面|封面|侧头像|证件照|立绘|名片|普通攻击|元素战技|元素爆发')
    }
    if (!role) return logger.error("指令可能错误", role)
    let type = "";
    if (/介绍/.test(this.e.msg)) {
        type = "角色介绍"; //2.3版本及之前的角色海报与介绍为同一张图，阿贝多没有角色海报与介绍
    } else if (/封面/.test(this.e.msg)) {
        type = "角色封面"; //芙宁娜,林尼,琳妮特,菲米尼,魈拥有多张封面
    } else if (/海报/.test(this.e.msg)) {
        type = "角色海报";
    } else if (/收益曲线/.test(this.e.msg)) {
        type = "收益曲线";
    } else if (/名片/.test(this.e.msg)) {
        type = "名片";
    } else if (/立绘/.test(this.e.msg)) {
        type = "立绘";
    } else if (/证件照/.test(this.e.msg)) {
        type = "证件照";
    } else if (/侧头像/.test(this.e.msg)) {
        type = "侧头像";
    } else if (/普通攻击/.test(this.e.msg)) {
        type = "普通攻击";
    } else if (/元素战技/.test(this.e.msg)) {
        type = "元素战技";
    } else if (/元素爆发/.test(this.e.msg)) {
        type = "元素爆发";
    } else {
        type = "？";
    }
    /** 主角特殊处理 */
    if (['10000005', '10000007', '20000000'].includes(String(role.roleId))) {
      if (!['风主', '岩主', '雷主', '草主', '水主'].includes(role.alias)) {
        await this.e.reply(`请选择：风主${type}、岩主${type}、雷主${type}、草主${type}、水主${type}`)
        return
      } else {
        role.name = role.alias
      }
    }
    let imgPath
    let url
    if (type == '收益曲线') {
      if (!this.curve[role.name]) return this.e.reply("暂无该角色收益曲线")
      url = this.curve[role.name]
      imgPath = `${this.curvepath}/${role.name}.png`
    } else if (type == '角色介绍') {
      if (!this.introduce[role.name]) return this.e.reply("暂无该角色介绍")
      url = this.introduce[role.name]
      imgPath = `${this.introducepath}/${role.name}.png`
    } else if (type == '角色封面') {
      if (!this.cover[role.name]) return this.e.reply("暂无该角色封面")
      url = this.cover[role.name]
      imgPath = `${this.coverpath}/${role.name}.png`
    } else if (type == '角色海报') {
      if (!this.poster[role.name]) return this.e.reply("暂无该角色海报")
      url = this.poster[role.name]
      imgPath = `${this.posterpath}/${role.name}.png`
    } else if (type == '普通攻击') {
      if (!this.attack[role.name]) return this.e.reply("暂无该角色普通攻击介绍")
      url = this.attack[role.name]
      imgPath = `${this.attackpath}/${role.name}.png`
    } else if (type == '元素战技') {
      if (!this.skill[role.name]) return this.e.reply("暂无该角色元素战技介绍")
      url = this.skill[role.name]
      imgPath = `${this.skillpath}/${role.name}.png`
    } else if (type == '元素爆发') {
      if (!this.outbreak[role.name]) return this.e.reply("暂无该角色元素爆发介绍")
      url = this.outbreak[role.name]
      imgPath = `${this.outbreakpath}/${role.name}.png`
    } else if (type == '名片') {
      imgPath = `${this.img}/${role.name}/imgs/card.webp`
    } else if (type == '立绘') {
      imgPath = `${this.img}/${role.name}/imgs/splash.webp`
    } else if (type == '证件照') {
      imgPath = `${this.img}/${role.name}/imgs/face.webp`
    } else if (type == '侧头像') {
      imgPath = `${this.img}/${role.name}/imgs/side.webp`
    } else {
      await this.e.reply(`${role.name}？`)
    }
    if (!fs.existsSync(imgPath)) {
      await this.getImg(url, imgPath)
    }
    if (fs.existsSync(imgPath)) {
      await this.e.reply(segment.image(imgPath));
      return true;
    }
  }

  //下载图片
  async getImg(name, Path) {
    logger.mark(`${this.e.logFnc} 下载${name}素材图`)
    if (!await common.downFile(name, Path)) {
      return false
    }
    logger.mark(`${this.e.logFnc} 下载${name}素材成功`)
    return true
  }
}
