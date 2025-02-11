import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '艾梅莉埃天赋：[余薰] 每萃集两枚香韵,柔灯之匣·二阶将消耗香韵,并浸析出「清露香氛」,对敌人造成草元素范围伤害。'
},
{
  title: '艾梅莉埃天赋：[顶空集香] 场上存在艾梅莉埃自己创造的柔灯之匣时,队伍中附近的所有角色对燃烧伤害的火元素抗性提升[_res]%',
  data: {
    _res: 85
  }
},
{
  check: ({ params }) => params.BurningDetermine === true,
  title: '艾梅莉埃天赋：[精馏] 敌人处于燃烧化状态下，造成伤害提升[dmg]%',
  data: {
    dmg: ({ calc, attr }) => Math.min( 36 , calc(attr.atk) / 1000 * 15 )
  }
},
{
  check: ({ params }) => params.Lingering_Fragrance === true,
  title: '艾梅莉埃1命：[淡香浸析] 撷萃调香与固有天赋「余薰」的清露香氛造成的伤害提升[dmg]%.',
  cons: 1,
  data: {
    dmg: 20
  }
},
{
  title: '艾梅莉埃2命：[湖光顶调] 撷萃调香、香氛演绎或固有天赋「余薰」的清露香氛（需解锁该固有天赋）命中敌人时，元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: 30
  }
},
{
  title: '艾梅莉埃4命：[柔灯心韵] 香氛演绎的持续时间延长[_qSustainedPlus]秒，且每名敌人被香露选为目标的间隔降低[_qSpeedPlus]秒。',
  cons: 4,
  data: {
    _qSustainedPlus: 2 ,
    _qSpeedPlus: 0.3
  }
},
{
  check: ({ params }) => params.BurstAfter >= 2,
  title: '艾梅莉埃6命：[茉洁香迹] 施放撷萃调香或香氛演绎时﹐将获得「香迹留驻」使普通攻击与重击将转为无法被附魔覆盖的草元素伤害,并提升造成的伤害[aPlus]',
  cons: 6,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.atk) * 300 / 100 ,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 300 / 100
  }
}]

