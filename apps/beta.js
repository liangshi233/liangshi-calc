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
          reg: '^#?((开拓者·毁灭|开拓者•毁灭|开拓者毁灭|毁灭开拓者|物理开拓者|开拓者物理|毁灭主|物理主|物主)(极限面板|面板100000000))$',
          fnc: 'wlktz'
        }, {
          reg: '^#?((开拓者·存护|开拓者•存护|开拓者存护|存护开拓者|火开拓者|开拓者火|存护主)(极限面板|面板100000000))$',
          fnc: 'chktz'
        }, {
          reg: '^#?((开拓者·同谐|开拓者•同谐|开拓者同谐|同谐开拓者|虚数开拓者|开拓者虚数|同谐主)(极限面板|面板100000000))$',
          fnc: 'txktz'
        },{
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

  async wlktz () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/3.bmp`))
    return true
  }

  async chktz () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/4.bmp`))
    return true
  }

  async txktz () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/5.bmp`))
    return true
  }

}
