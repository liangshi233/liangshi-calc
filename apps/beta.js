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
          reg: '^#?((极限|极限面板)?(云璃)(极限面板|面板100000000))$',
          fnc: 'yl'
        },{
          reg: '^#?((极限|极限面板)?(椒丘)(极限面板|面板100000000))$',
          fnc: 'jq'
        },{
          reg: '^#?((极限|极限面板)?(玛拉妮|鲨鱼妹)(极限面板|面板100000000))$',
          fnc: 'mln'
        },{
          reg: '^#?((极限|极限面板)?(基尼奇)(极限面板|面板100000000))$',
          fnc: 'jnq'
        }
      ]
    })
  }

  async yl () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.bmp`))
    return true
  }

  async jq () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.bmp`))
    return true
  }

  async mln () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.jpg`))
    return true
  }

  async jnq () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.jpg`))
    return true
  }

}
