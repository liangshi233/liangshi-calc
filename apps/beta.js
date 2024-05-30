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
          reg: '^#?((流萤|流荧|牢萤|留莹|留萤|萨姆|萤宝)(极限面板|面板100000000))$',
          fnc: 'ly'
        },{
          reg: '^#?((翡翠)(极限面板|面板100000000))$',
          fnc: 'fc'
        }
      ]
    })
  }

  async ly () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.bmp`))
    return true
  }

  async fc () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.bmp`))
    return true
  }

}
