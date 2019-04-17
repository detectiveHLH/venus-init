const chalk = require('chalk');
const shell = require('shelljs');
const { log, mkdir, cd, cp, rm } = require('./util');

/**
 * Initial project
 */
const initProject = (config) => {
  const { projectName } = config;

  /**
   * Clone the demo project from github
   * source: https://github.com/detectiveHLH/venus-demo
   */
  log('Initialing the project......');
  shell.exec('git clone https://github.com/detectiveHLH/venus-demo.git ' + config.projectName);

  /**
   * Into the main directory and remove the git directory
   */
  cd(projectName);
  rm('.git');

  /**
   * - Replace file in root directory
   */
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', 'PROJECT_NAME', projectName, file);
    shell.sed('-i', 'PROJECT_GROUP_ID', convertToDot(projectName), file);
  });

  /**
   * Start replace in api module
   */
  cd('api');

  // Replace parameter in api pom.xml
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', 'PROJECT_NAME', projectName, file);
    shell.sed('-i', 'PROJECT_GROUP_ID', convertToDot(projectName), file);
  });

  cd('src/main/java/com/t4f/web');
  shell.exec('ls');



  /**
   * - Return to root directory
   */
  cd('../../../../../../../');

  /**
   * - Into shared directory
   */
  cd('shared');
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', 'PROJECT_NAME', projectName, file);
    shell.sed('-i', 'PROJECT_GROUP_ID', convertToDot(projectName), file);
  });

};

/**
 * Convert '-' to '.'
 */
const convertToDot = (s) => {
  return s.replace(/-/g, '.');
};

module.exports = initProject;
