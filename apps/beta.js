const _path = process.cwd()

export class beta extends plugin {
  constructor () {
    super({
      name: '测试角色极限面板',
      dsc: '测试角色极限面板',
      event: 'message',
      priority: -1,
      rule: [
        // 每个角色已分开，不需要此功能或不需要的角色请将对应的注释
        {
          reg: '^#?((极限|极限面板)?(瓦雷莎)(极限面板|面板100000000))$',
          fnc: 'wls'
        },
        {
          reg: '^#?((极限|极限面板)?(伊安珊)(极限面板|面板100000000))$',
          fnc: 'yas'
        }
      ]
    })
  }

  async wls () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.jpg`))
    return true
  }

  async yas () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.jpg`))
    return true
  }

}
