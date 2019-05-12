const chalk = require('chalk');
const shell = require('shelljs');
const { log, mkdir, cd, cp, rm } = require('./util');

/**
 * Initial project
 */
const initProject = (config) => {
  const { artifact, group } = config;
  const GROUP = 'GROUP';
  const ARTIFACT = 'ARTIFACT';
  const API_MODULE = 'api';
  const INITIAL_MENUS = ['config', 'controller', 'dao', 'dto', 'entity', 'service'];


  /**
   * Clone the demo project from github
   * source: https://github.com/detectiveHLH/venus-demo
   */
  log('Initialing the project...');


  console.log(chalk`{white.bold [1/3]} 🔍` + chalk`{default.bold Clone project into local path...}`);
  shell.exec('git clone https://github.com/detectiveHLH/venus-demo.git ' + config.artifact);

  /**
   * Into the main directory and remove the git directory
   */
  cd(artifact);
  rm('.git');

  /**
   * - Replace file in root directory
   */
  console.log(chalk`{white.bold [2/3] 🚚}` + chalk`{default.bold Creating root path...}`);
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', ARTIFACT, artifact, file);
    shell.sed('-i', GROUP, group, file);
  });

  /**
   * Start replace in api module
   */
  console.log(chalk`{white.bold [3/3] 🔗}` + chalk`{default.bold Create api module...}`);
  cd(API_MODULE);

  // Replace parameter in api pom.xml
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', ARTIFACT, artifact, file);
    shell.sed('-i', GROUP, group, file);
  });

  cd('src/main/resources');
  shell.ls('*.yml').forEach(file => {
    shell.sed('-i', ARTIFACT, artifact, file);
    shell.sed('-i', GROUP, group, file);
  });

  cd('mapper');
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', ARTIFACT, artifact, file);
    shell.sed('-i', GROUP, group, file);
  });

  cd('../../java');

  /**
   * Rename the package name
   */
  let dirNum = 0;
  let packages = group.split('.');
  let groupPath = '';
  packages.forEach((element) => {
    groupPath += `${element}/`;
    mkdir(element);
    cd(element);
    dirNum++;
  });
  mkdir(API_MODULE);

  for (let i = 0; i < dirNum; i++) {
    cd('..');
  }

  cp(`${GROUP}/api`, `${groupPath}`);

  rm(`${GROUP}`);

  cd(`${groupPath}/api`);
  shell.ls('*.java').forEach(file => {
    shell.sed('-i', GROUP, group, file);
  });


  for (let i = 0; i < INITIAL_MENUS.length; i++) {
    const path = i === 0 ? `${INITIAL_MENUS[i]}` : `../${INITIAL_MENUS[i]}`;
    cd(`${path}`);
    shell.ls('*.java').forEach(file => {
      shell.sed('-i', GROUP, group, file);
    });
  }
  cd ('impl');
  shell.ls('*.java').forEach(file => {
    shell.sed('-i', GROUP, group, file);
  });

  log('✨ Done. ', 'green');

};

module.exports = initProject;
