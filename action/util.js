/**
 * util
 *
 * @author hulunhao@gmail.com
 * @date 2019-04-17 08:43
 **/

const chalk = require('chalk');
const shell = require('shelljs');

/**
 * 使用chalk输出自定义样式的文字
 *
 * @param content
 * @param color
 */
exports.log = (content, color = 'blue') => {
  console.log(chalk[color](content));
};

/**
 * 创建目录的函数
 *
 * @param dirName
 */
exports.mkdir = (dirName) => {
  const res = shell.exec('mkdir ' + dirName);
  return res.code !== 1;
};

/**
 * 进入目录
 *
 * @param dirName
 */
exports.cd = (dirName) => {
  shell.cd(dirName);
};

/**
 * 拷贝文件到指定目录
 *
 * @param source
 * @param target
 */
exports.cp = (source, target) => {
  shell.cp('-R', source, target);
};

/**
 * 删除指定文件
 *
 * @param source
 * @param target
 */
exports.rm = (target) => {
  if (target.indexOf('*') !== -1) {
    return;
  }
  shell.rm('-rf', target);
};
