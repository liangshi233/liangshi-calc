import yaml from 'yaml';
import fs from 'fs'
/**
 * 解析配置文件
 * @param {*} file 配置文件夹
 * @param {*} name 配置文件名
 * @returns 
 */
function getconfig(file, name) {
    const _path = process.cwd().replace(/\\/g, '/')
    let cfgyaml = `${_path}/plugins/liangshi-calc/${file}/${name}.yaml`
    const configData = fs.readFileSync(cfgyaml, 'utf8');
    let config = yaml.parse(configData);
    return { config };
}

export default getconfig;