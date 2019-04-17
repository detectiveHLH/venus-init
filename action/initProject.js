const chalk = require('chalk');
const shell = require('shelljs');
const { log, mkdir } = require('./util');

/**
 * 初始化项目
 */
const initProject = (config) => {
  log('Starting to initial project......');
  log('Creating the project source');

  // 创建项目主目录
  mkdir(config.projectName);
};


module.exports = initProject;
