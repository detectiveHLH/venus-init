const chalk = require('chalk');
const shell = require('shelljs');
const { log, mkdir, cd, cp, rm } = require('./util');

/**
 * 初始化项目
 */
const initProject = (config) => {
  const { projectName } = config;

  log('Initialing the project......');
  shell.exec('git clone https://github.com/detectiveHLH/venus-demo.git ' + config.projectName);
  cd(projectName);
  rm('.git');
  // // 创建项目主目录
  // if (mkdir(config.projectName)) {
  //   log(`The main directory of this project named ${config.projectName} has been created.`, 'green');
  //
  //   log('Creating api module......');
  //   cd(config.projectName);
  //   if (mkdir('api')) {
  //     log(`Api created`, 'green');
  //     cd('api');
  //   }
  // }
};


module.exports = initProject;
