import { GVersion, Common } from '#liangshi'

export class Help extends plugin {
  constructor() {
    super({
      name: '原神历史版本',
      dsc: '原神历史版本',
      event: 'message',
      priority: 50000,
      rule: [
        {
          reg: "^#?原神版本$",
          fnc: 'version'
        }
      ]
    })
  }

  async version(e) {
    return await Common.render('version/version-info', {
      currentVersion: GVersion.version,
      changelogs: GVersion.changelogs,
      elem: 'sangonomiya'
    }, { e, scale: 4.0 })
  }
}


