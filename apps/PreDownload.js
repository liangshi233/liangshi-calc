import plugin from '../../../lib/plugins/plugin.js'
import helpUtil from '../components/PreDownload.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

const _path = process.cwd().replace(/\\/g, '/')

export class help extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '原神预下载占用',
      /** 功能描述 */
      dsc: '展示各平台当预下载需要预留储存情况',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 50,
      rule: [
        {
          reg: '^#(原神)+(预下载|预下载占用|预下载空间占用|预下载储存占用)$',
          fnc: 'help'
        }
      ]
    })
  }

  async help (e) {
    let helpList = helpUtil.getList()
    let data = {
      tplFile: './plugins/liangshi-calc/resources/help/PreDownload.html',
      pluResPath: `${_path}/plugins/liangshi-calc/resources`,
      helpList
    }
    let img = await puppeteer.screenshot('help', data)
    e.reply(img)
    return true
  }
}
