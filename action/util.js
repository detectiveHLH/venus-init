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
exports.mkdir = async (dirName) => {
  await shell.exec('mkdir ' + dirName);
};
