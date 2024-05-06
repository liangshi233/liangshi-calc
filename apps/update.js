export class update extends plugin {
  constructor () {
    super({
      name: '[伤害计算拓展]更新',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: '^#*梁氏(计算|插件)?(强制)?更新$',
          fnc: 'update',
          permission: 'master'
        },
        {
          reg: '^#*梁氏(计算|插件)?更新日志$',
          fnc: 'updateLog',
          permission: 'master'
        }
      ]
    })
  }

  async update () {
    this.e.msg = this.e.msg.includes('强制') ? '#强制更新liangshi-calc' : '#更新liangshi-calc'
    return false
  }

  async updateLog () {
    this.e.msg = '#更新日志liangshi-calc'
    return false
  }
}
