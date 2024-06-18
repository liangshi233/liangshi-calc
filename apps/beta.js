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
          reg: '^#?((云璃)(极限面板|面板100000000))$',
          fnc: 'yl'
        },{
          reg: '^#?((椒丘)(极限面板|面板100000000))$',
          fnc: 'jq'
        },{
          reg: '^#?((Emilie|调香师|梅莉|爱美丽|艾梅丽埃|艾梅莉埃)(极限面板|面板100000000))$',
          fnc: 'amla'
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

  async amla () {
    this.e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/3.bmp`))
    return true
  }

}
