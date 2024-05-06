import fs from 'node:fs'
import { LSconfig } from '#liangshi'

const _path = process.cwd()
const cfg = LSconfig.getConfig('user', 'config')
const configPath = `${_path}/plugins/liangshi-calc/config/config.yaml`

export class feedback extends plugin {
  constructor () {
    super({
      name: '反馈',
      dsc: '反馈',
      event: 'message',
      priority: 8000,
      rule: [
        {
          reg: '^#*(伤害计算拓展|伤害计算|计算|梁氏|liangshi)(插件)?(反馈|错误|有问题|不对)$',
          fnc: 'fk'
        }, {
          reg: '^#?(删除|重置|移除|清除|还原)(liangshi设置|Liangshi设置|梁氏设置)$',
          fnc: 'sc',
          permission: 'master'
        }, {
          reg: '^#?梁氏([，,])?启动([！!])?$',
          fnc: 'sc2',
          permission: 'master'
        }
      ]
    })
  }

  async fk () {
    let msg = ['若 角色伤害计算/角色圣遗物评分/预设面板 出现问题或错误可点击下方链接留言反馈\nhttps://gitee.com/liangshi233/liangshi-calc/board\n如果您对 角色伤害计算/角色圣遗物评分/预设面板 有改进的意见也欢迎点击链接进行留言\n【使用方法：点击链接后选择[新建lssue]，在标题处填入你的 问题/建议 主题，在下方输入详细内容】\n【您提交的内容会在3小时内进行处理】']
    this.e.reply(msg)
    return true
  }

  async sc () {
    try {
      fs.unlinkSync(configPath)
      this.e.reply('删除成功，重启Bot后设置将会自动重置')
      return true
    } catch {
      this.e.reply('删除异常，请重试或手动删除')
      return true
    }
  }

  async sc2 () {
    if (!cfg.calcLiang && !cfg.artisLiang) {
      this.e.reply('检测到设置可能异常，尝试删除设置以重新应用默认设置')
      try {
        fs.unlinkSync(configPath)
        this.e.reply('删除成功，重启Bot后设置将会自动重置')
        return true
      } catch {
        this.e.reply('删除异常，请重试或手动删除')
        return true
      }
    } else {
      this.e.reply('您已经启动过了，请勿重复启动')
      return true
    }
  }
}
