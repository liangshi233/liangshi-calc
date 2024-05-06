import { Loccupied, Common, LSconfig } from '#liangshi'

export class occupied extends plugin {
  constructor () {
    super({
      name: '原神占用',
      dsc: '原神历史/预下载占用',
      event: 'message',
      priority: 50000,
      rule: [
        {
          reg: '^#?原神占用$',
          fnc: 'Occupied'
        }, {
          reg: '^#(原神)+(预下载|预下载占用|预下载空间占用|预下载储存占用)$',
          fnc: 'preDownload'
        }
      ]
    })
  }

  async Occupied (e) {
    return await Common.render('version/Occupied-info', {
      currentVersion: Loccupied.version,
      changelogs: Loccupied.changelogs,
      elem: 'orchard'
    }, { e, scale: 4.0 })
  }

  async preDownload () {
    await this.renderImg('liangshi-calc', 'help/PreDownload.html', { helpList: LSconfig.preDownload })
    return true
  }
}
