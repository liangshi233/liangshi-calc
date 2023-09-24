import fs from 'fs'
import { Cfg, Loccupied ,  Common, Data } from '../components/index.js'

export class Help extends plugin {
  constructor() {
    super({
      name: '原神历史版本占用',
      dsc: '原神历史版本占用',
      event: 'message',
      priority: 50000,
      rule: [
        {
          reg: "^#?原神占用$",
          fnc: 'Occupied'
        }
      ]
    })
  }


  async Occupied(e) {
    return await Common.render('version/Occupied-info', {
      currentVersion: Loccupied.version,
      changelogs: Loccupied.changelogs,
      elem: 'orchard'
    }, { e, scale: 4.0 })
  }
}
