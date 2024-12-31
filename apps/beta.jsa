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
          reg: '^#?((极限|极限面板)?(火神|玛薇卡)(极限面板|面板100000000))$',
          fnc: 'mwk'
        },{
          reg: '^#?((极限|极限面板)?(茜特菈莉)(极限面板|面板100000000))$',
          fnc: 'xtll'
        },{
          reg: '^#?((极限|极限面板)?(蓝砚)(极限面板|面板100000000))$',
          fnc: 'ly'
        }
      ]
    })
  }

  async mwk () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.jpg`))
    return true
  }

  async xtll () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.jpg`))
    return true
  }

  async ly () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/3.jpg`))
    return true
  }



}
