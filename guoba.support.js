import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getconfig from './components/cfg.js';
import fs from 'fs';
import yaml from 'yaml';
import lodash from 'lodash'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function supportGuoba() {
    return {
        pluginInfo: {
            name: `liangshi-calc`,
            title: '梁氏插件(liangshi-calc)',
            author: '@liangshi-calc',
            authorLink: 'https://gitee.com/liangshi233',
            link: 'https://gitee.com/liangshi233/liangshi-calc',
            isV3: true,
            isV2: false,
            description: `为角色面板功能提供全方位拓展`,
            icon: 'svg-spinners:clock',
            iconColor: '#d19f56',
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
                    label: 'liangshicalc基础',
                    component: 'Switch',
                },
                {
                    field: 'calcLiangQ',
                    label: 'liangshicalc超全',
                    component: 'Switch',
                },
                {
                    field: 'calcLi',
                    label: 'liangshicalc大爷',
                    component: 'Switch',
                },
                {
                    field: 'artisLiang',
                    label: 'liangshicalc普通评分',
                    component: 'Switch',
                },
                {
                    field: 'artisLiangZ',
                    label: 'liangshicalc自适应评分',
                    component: 'Switch',
                },
                {
                    component: 'Divider',
                    label: '一般设置'
                },
                {
                    field: 'autoRefresh',
                    label: '自动刷新预设面板',
                    component: 'Switch',
                },
                {
                    field: 'panelmodel',
                    label: '自动刷新预设面板',
                    helpMessage: `0 用户自行修改的预设面板

1 liangshi-calc默认的预设面板

2 liangshi-calc默认的带主角版本预设面板

li 来自阿离（大爷）版本的预设面板

其他 将此选项设置为其他作者的预设面板名称`,
                    component: 'Input',
                },
                {
                    field: 'namemodel',
                    label: '设置伤害条目名称',
                    helpMessage: `1 伤害条目名称将使用默认设置名称
                    2 伤害条目将使用全称
                    3 伤害条目将简化小部分名称
                    4 伤害条目将使用通俗叫法
                    5 伤害条目将使用字母简化名称
                    6 伤害条目将使用纯字母名称显示`,
                    component: 'InputNumber',
                    componentProps: {
                    min: 1,
                    max: 6,
                    }
                },
                {
                    component: 'Divider',
                    label: '计算/评分基础设置'
                },
                {
                    field: 'autoRefresh',
                    label: '重启后会自动刷新极限、平民等预设面板',
                    component: 'Switch',
                },
                {
                    field: 'panelmodel',
                    label: '切换面板服务',
                    bottomHelpMessage: `自动刷新预设面板的版本，默认使用liangshi，需要自定义请修改为 0`,
                    component: 'InputNumber',
                    componentProps: {
                    min: 0,
                    max: 1,
                    }
                },
            ],
            async getConfigData() {
                let { config } = getconfig(`config`, `config`)
                return config;
            },
            async setConfigData(data, { Result }) {
                // 1.读取现有配置文件
                const configFilePath = path.join(__dirname,'config', 'config.yaml');
                let config = {};
                if (fs.existsSync(configFilePath)) {
                    const configContent = fs.readFileSync(configFilePath, 'utf8');
                    config = yaml.parse(configContent) || {};
                }
                // 2. 更新配置对象
                for (const [keyPath, value] of Object.entries(data)) {
                    lodash.set(config, keyPath, value);
                }
                // 3. 将更新后的配置对象写回文件
                const updatedConfigYAML = yaml.stringify(config);
                fs.writeFileSync(configFilePath, updatedConfigYAML, 'utf8');
                logger.mark(`[梁氏插件:配置文件]配置文件更新`)
                return Result.ok({}, '保存成功~');
            }
        }
    }
}
