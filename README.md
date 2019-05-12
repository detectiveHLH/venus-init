<h1 align="center">venus-init</h1>
Venus-init is the tool for spring application development. You can start a Spring Boot application with a single command.


## Install
```bash
npm install venus-init
```

## Usage
Just type the code below and follow the notice until finish the initialization.
```bash
venus init
```
Or you can type like this.
```bash
venus i
```

## Example
Below is the structure of a demo project that created by the cli.
```
├── LICENSE
├── README.md
├── api
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── detectivehlh
│           │           └── demo
│           │               └── api
│           │                   ├── Application.java
│           │                   ├── config
│           │                   │   └── DbConfig.java
│           │                   ├── controller
│           │                   │   └── HelloController.java
│           │                   ├── dao
│           │                   │   └── HelloMapper.java
│           │                   ├── dto
│           │                   │   └── HelloDTO.java
│           │                   ├── entity
│           │                   │   └── Hello.java
│           │                   └── service
│           │                       ├── HelloService.java
│           │                       └── impl
│           │                           └── HelloServiceImpl.java
│           └── resources
│               ├── application.yml
│               └── mapper
│                   └── HelloMapper.xml
└── pom.xml
```
Inside the project, we have a unit named Hello to help you understand this project more efficiently

when you start the project successfully. Visit [http://localhost:8080/hello](http://localhost:8080/hello)，when you see the message below, congratulations! It worked.

```json
{
    "message": "Hello world",
    "createdAt": "current_timestamp"
}
```

## Swagger
You can visit [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) to see your api documentation that generate automatically by swagger.

## Licences
[MIT](https://github.com/detectiveHLH/venus-init/blob/master/LICENSE)
