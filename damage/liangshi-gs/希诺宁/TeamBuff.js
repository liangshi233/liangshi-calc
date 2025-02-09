export const TeamBuff_Xilonen = [
{
  check: ({ params }) => params.team === true && params.Xilonen === true,
  title: '希诺宁1命：[献予慵眠的休假日] 「源音采样」激活时，提升队伍中附近的当前场上角色的抗打断能力[_interruption]%',
  cons: 1,
  data: {
    _interruption: 50
  }
},
{
  check: ({ params }) => params.team === true && params.Xilonen === true,
  title: '希诺宁2命：[献予灼原的五重奏] 根据「源音采样」的元素类型，使造成的伤害提升[dmg]%,攻击力提升[atkPct]%,生命值上限提升[hpPct]%,暴击伤害提升[cdmg]%,恢复[_energyevery]点元素能量,元素爆发的冷却时间缩短[_qCdPlus]秒',
  cons: 2,
  data: {
    dmg: ({ element }) => ['岩'].includes(element) ? 50 : 0,
    atkPct: ({ element }) => ['火'].includes(element) ? 45 : 0,
    hpPct: ({ element }) => ['水'].includes(element) ? 45 : 0,
    cdmg: ({ element }) => ['冰'].includes(element) ? 60 : 0,
    _energyevery: ({ element }) => ['雷'].includes(element) ? 25 : 0,
    _qCdPlus: ({ element }) => ['雷'].includes(element) ? 6 : 0
  }
},
{
  title: '希诺宁4命：[献予午后的花之梦] 施放音火锻淬后，普通攻击、重击与下落攻击造成的伤害提升[aPlus]',
  cons: 4,
  data: {
    aPlus: 3000 * 65 / 100,
    a2Plus: 3000 * 65 / 100,
    a3Plus: 3000 * 65 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Xilonen === true,
  title: '希诺宁技能：[音火锻淬] 在采样器激活时降低附近的敌人的对应元素抗性[kx]%',
  data: {
    kx: ({ cons, element }) => ['雷', '冰', '水', '火', '岩'].includes(element) ? (cons >= 3 ? 42 : 33) : 0
  }
}]
