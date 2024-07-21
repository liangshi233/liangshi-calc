import lodash from 'lodash'
import { LSconfig } from '#liangshi'

export function supportGuoba () {
  return {
    pluginInfo: {
      name: 'liangshi-calc',
      title: '梁氏插件(liangshi-calc)',
      author: '@liangshi',
      authorLink: 'https://gitee.com/liangshi233',
      link: 'https://gitee.com/liangshi233/liangshi-calc',
      isV3: true,
      isV2: false,
      description: '为角色面板功能提供全方位拓展',
      icon: 'svg-spinners:clock',
      iconColor: '#d19f56'
      // iconPath: path.join(__dirname, 'resources/logo.ico')
    },
    configInfo: {
      schemas: [
        {
          component: 'Divider',
          label: '计算/评分基础设置'
        },
        {
          field: 'calcLiang',
          label: 'liangshicalc 基础',
          component: 'Switch'
        },
        {
          field: 'calcLiangQ',
          label: 'liangshicalc 超全',
          component: 'Switch'
        },
        {
          field: 'calcLi',
          label: 'liangshicalc 大爷',
          component: 'Switch'
        },
        {
          field: 'artisLiang',
          label: 'liangshicalc 基础评分',
          component: 'Switch'
        },
        {
          field: 'artisLiangZ',
          label: 'liangshicalc 自适应评分',
          component: 'Switch'
        },
        {
          component: 'Divider',
          label: '一般设置'
        },
        {
          field: 'autoRefresh',
          label: '自动刷新预设面板',
          bottomHelpMessage: '载入插件时是否自动刷新设置的预设面板',
          component: 'Switch'
        },
        {
          field: 'panelmodel',
          label: '自动刷新预设面板',
          helpMessage: '设置自动刷新预设面板的版本',
          component: 'Select',
          componentProps: {
            options: [
              { label: '用户自行修改的预设面板', value: 0 },
              { label: 'liangshi-calc默认的预设面板', value: 1 },
              { label: 'liangshi-calc默认的带主角版本预设面板', value: 2 },
              { label: '来自阿离（大爷）版本的预设面板', value: 'li' },
              { label: '将此选项设置为其他作者的预设面板名称', value: '其他' }
            ]
          }
        },
        {
          field: 'namemodel',
          label: '伤害条目名称',
          helpMessage: '设置伤害条目名称显示',
          component: 'Select',
          componentProps: {
            options: [
              { label: '使用默认设置名称', value: 1 },
              { label: '使用全称', value: 2 },
              { label: '简化小部分名称', value: 3 },
              { label: '使用通俗叫法', value: 4 },
              { label: '使用字母简化名称', value: 5 },
              { label: '使用纯字母名称显示', value: 6 }
            ]
          }
        },
        {
          field: 'rankingOnemodel',
          label: '角色排行规则首选',
          helpMessage: '角色排行规则首选设置',
          component: 'Select',
          componentProps: {
            options: [
              { label: '默认的排行设置', value: 'm' },
              { label: '使用普通攻击伤害', value: 'a' },
              { label: '使用 ( 原神：重击伤害 ，星穹铁道：追加攻击 ）', value: 'z' },
              { label: '使用 ( 原神：高空下落攻击伤害 ，星穹铁道：强化普通攻击 ）', value: 'c' },
              { label: '使用 ( 原神：元素战技伤害 ，星穹铁道：战技伤害 ）', value: 'e' },
              { label: '使用 ( 原神：元素爆发伤害 ，星穹铁道：终结技伤害 ）', value: 'q' },
              { label: '使用角色的辅助队友能力', value: 'f' },
              { label: '使用角色的治疗量/护盾吸收量/伤害消解量', value: 'h' },
              { label: '使用角色的养成度（仅限使用极简版伤害计算）', value: 'y' },
              { label: '使用角色的单轮总伤害量（仅限使用超全版伤害计算）', value: 'dph' },
              { label: '使用角色的单轮总治疗量（仅限使用超全版伤害计算）', value: 'hph' },
              { label: '使用角色的平均每秒伤害值（仅限使用超全版伤害计算）', value: 'dps' },
              { label: '使用角色的平均每秒治疗量（仅限使用超全版伤害计算）', value: 'hps' }
            ]
          }
        },
        {
          field: 'rankingTwomodel',
          label: '角色排行规则次选',
          helpMessage: '角色排行规则次选设置(此选项为角色排行次选规则，角色排行时，首选规则未命中时候将会使用此规则)',
          component: 'Select',
          componentProps: {
            options: [
              { label: '默认的排行设置', value: 'm' },
              { label: '使用普通攻击伤害', value: 'a' },
              { label: '使用 ( 原神：重击伤害 ，星穹铁道：追加攻击 ）', value: 'z' },
              { label: '使用 ( 原神：高空下落攻击伤害 ，星穹铁道：强化普通攻击 ）', value: 'c' },
              { label: '使用 ( 原神：元素战技伤害 ，星穹铁道：战技伤害 ）', value: 'e' },
              { label: '使用 ( 原神：元素爆发伤害 ，星穹铁道：终结技伤害 ）', value: 'q' },
              { label: '使用角色的辅助队友能力', value: 'f' },
              { label: '使用角色的治疗量/护盾吸收量/伤害消解量', value: 'h' },
              { label: '使用角色的养成度（仅限使用极简版伤害计算）', value: 'y' },
              { label: '使用角色的单轮总伤害量（仅限使用超全版伤害计算）', value: 'dph' },
              { label: '使用角色的单轮总治疗量（仅限使用超全版伤害计算）', value: 'hph' },
              { label: '使用角色的平均每秒伤害值（仅限使用超全版伤害计算）', value: 'dps' },
              { label: '使用角色的平均每秒治疗量（仅限使用超全版伤害计算）', value: 'hps' }
            ]
          }
        },
        {
          field: 'rankingThreemodel',
          label: '角色排行规则备选',
          helpMessage: '角色排行规则备选设置(此选项为角色排行备选规则，角色排行时，首选与次选规则均未命中时候将会使用此规则)',
          component: 'Select',
          componentProps: {
            options: [
              { label: '默认的排行设置', value: 'm' },
              { label: '使用普通攻击伤害', value: 'a' },
              { label: '使用 ( 原神：重击伤害 ，星穹铁道：追加攻击 ）', value: 'z' },
              { label: '使用 ( 原神：高空下落攻击伤害 ，星穹铁道：强化普通攻击 ）', value: 'c' },
              { label: '使用 ( 原神：元素战技伤害 ，星穹铁道：战技伤害 ）', value: 'e' },
              { label: '使用 ( 原神：元素爆发伤害 ，星穹铁道：终结技伤害 ）', value: 'q' },
              { label: '使用角色的辅助队友能力', value: 'f' },
              { label: '使用角色的治疗量/护盾吸收量/伤害消解量', value: 'h' },
              { label: '使用角色的养成度（仅限使用极简版伤害计算）', value: 'y' },
              { label: '使用角色的单轮总伤害量（仅限使用超全版伤害计算）', value: 'dph' },
              { label: '使用角色的单轮总治疗量（仅限使用超全版伤害计算）', value: 'hph' },
              { label: '使用角色的平均每秒伤害值（仅限使用超全版伤害计算）', value: 'dps' },
              { label: '使用角色的平均每秒治疗量（仅限使用超全版伤害计算）', value: 'hps' }
            ]
          }
        },
        {
          component: 'Divider',
          label: '伤害计算相关设置'
        },
        {
          field: 'energymodel',
          label: '环境产出能量设置',
          helpMessage: '此选项产出的能量会被角色的元素充能影响且会影响到角色DPS的计算，请慎重调整',
          bottomHelpMessage: '<0 环境会扣除角色能量；0 环境会扣除角色能量，角色无法通过环境获取元素能量；>0 环境会为角色提供能量或目标会产出元素能量',
          component: 'InputNumber',
          required: true,
          componentProps: {
            placehoder: '请输入数字'
          }
        },
        {
          field: 'technique',
          label: '角色秘技设置',
          helpMessage: '此选项仅对星铁角色生效，启用后角色计算将加入秘技加成',
          bottomHelpMessage: '0 角色不启用秘技；>0 角色启用秘技，根据设置的数字叠层',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placehoder: '请输入非负整数'
          }
        },
        {
          field: 'bndOfLifePlus',
          label: '角色初始生命之契设置',
          helpMessage: '此选项在会大幅影响到DPS和Pro版计算中圣遗物谐律异想断章的触发，请谨慎修改',
          bottomHelpMessage: '0 角色初始不拥有生命之契；>0 角色初始拥有指定生命值上限的生命之契，根据设置的数字叠层;200 在缩放设置为1的情况下角色始终拥有最高上限的生命之契',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            max: 200,
            placehoder: '请输入非负数'
          }
        },
        {
          field: 'bndOfLifePct',
          label: '角色生命之契缩放设置',
          helpMessage: '此选项在会大幅影响到DPS计算，请谨慎修改',
          bottomHelpMessage: '0 角色无法获取生命之契；>0&<1 角色获取生命之契按比例减少;1 角色正常获取生命之契;>1 角色获取生命之契按比例提升',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 0,
            placehoder: '请输入非负数'
          }
        }
      ],
      getConfigData () {
        let config = LSconfig.getConfig('user', 'config')
        return config
      },
      setConfigData (data, { Result }) {
        // 1.读取现有配置文件
        let config = LSconfig.getConfig('user', 'config')
        // 2. 更新配置对象
        for (const [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        // 3. 将更新后的配置对象写回文件
        LSconfig.writeData('user', 'config', config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}
