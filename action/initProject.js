const chalk = require('chalk');
const shell = require('shelljs');
const { log, mkdir, cd, cp, rm } = require('./util');

/**
 * Initial project
 */
const initProject = (config) => {
  const { projectName } = config;
  const PROJECT_GROUP_ID = 'PROJECT_GROUP_ID';
  const PROJECT_NAME = 'PROJECT_NAME';
  const API_MODULE = 'api';
  const SHARED_MODULE = 'shared';


  /**
   * Clone the demo project from github
   * source: https://github.com/detectiveHLH/venus-demo
   */
  log('Initialing the project...');


  console.log(chalk`{white.bold [1/4]} 🔍` + chalk`{default.bold Clone project into local path...}`);
  shell.exec('git clone https://github.com/detectiveHLH/venus-demo.git ' + config.projectName);

  /**
   * Into the main directory and remove the git directory
   */
  cd(projectName);
  rm('.git');

  /**
   * - Replace file in root directory
   */
  console.log(chalk`{white.bold [2/4] 🚚}` + chalk`{default.bold Creating root path...}`);
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', PROJECT_NAME, projectName, file);
    shell.sed('-i', PROJECT_GROUP_ID, convertToDot(projectName), file);
  });

  /**
   * Start replace in api module
   */
  console.log(chalk`{white.bold [3/4] 🔗}` + chalk`{default.bold Create api module...}`);
  cd(API_MODULE);

  // Replace parameter in api pom.xml
  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', PROJECT_NAME, projectName, file);
    shell.sed('-i', PROJECT_GROUP_ID, convertToDot(projectName), file);
  });

  cd('src/main');
  cd('resources');

  shell.ls('*.yml').forEach(file => {
    shell.sed('-i', PROJECT_NAME, projectName, file);
    shell.sed('-i', PROJECT_GROUP_ID, convertToDot(projectName), file);
  });

  cd('..');


  cd('java/com/t4f/web');

  /**
   * Rename the package name
   */
  // shell.exec('ls');
  rm(PROJECT_GROUP_ID);

  let dirNum = 0;
  let packages = projectName.split('-');
  packages.forEach((element) => {
    mkdir(element);
    cd(element);
    dirNum++;
  });
  mkdir(API_MODULE);

  cd(API_MODULE);
  // shell.exec('touch Application.java');
  shell.exec(`echo "package com.t4f.web.${convertToDot(projectName)}.api;" >> Application.java`);
  shell.exec('echo "" >> Application.java');
  shell.exec('echo "import lombok.extern.slf4j.Slf4j;" >> Application.java');
  shell.exec('echo "import org.springframework.boot.SpringApplication;" >> Application.java');
  shell.exec('echo "import org.springframework.boot.autoconfigure.SpringBootApplication;" >> Application.java');
  shell.exec('echo "import org.springframework.cloud.openfeign.EnableFeignClients;" >> Application.java');
  shell.exec('echo "" >> Application.java');
  shell.exec('echo "@SpringBootApplication" >> Application.java');
  shell.exec('echo "@EnableFeignClients" >> Application.java');
  shell.exec('echo "@Slf4j" >> Application.java');
  shell.exec('echo "public class Application {" >> Application.java');
  shell.exec('echo "    public static void main(String[] args) {" >> Application.java');
  shell.exec('echo "        SpringApplication.run(Application.class, args);" >> Application.java');
  shell.exec('echo "    }" >> Application.java');
  shell.exec('echo "}" >> Application.java');
  mkdir('config');
  mkdir('consts');
  mkdir('controller');
  mkdir('dao');
  mkdir('entity');
  mkdir('service');
  mkdir('util');

  /**
   * - Return to root directory
   */
  cd('../../../../../../../../');
  for (let i = 0; i < dirNum; i++) {
    cd('..');
  }

  /**
   * - Into shared directory
   */
  console.log(chalk`{white.bold [4/4] 📃}` + chalk`{default.bold Create shared module...}`);
  cd(SHARED_MODULE);

  shell.ls('*.xml').forEach(file => {
    shell.sed('-i', PROJECT_NAME, projectName, file);
    shell.sed('-i', PROJECT_GROUP_ID, convertToDot(projectName), file);
  });

  cd('src/main/java/com/t4f/web');
  rm(PROJECT_GROUP_ID);

  dirNum = 0;
  packages.forEach((element) => {
    mkdir(element);
    cd(element);
    dirNum++;
  });
  mkdir(SHARED_MODULE);

  cd(SHARED_MODULE);

  log('✨ Done. ', 'green');

};

/**
 * Convert '-' to '.'
 */
const convertToDot = (s) => {
  return s.replace(/-/g, '.');
};

module.exports = initProject;
