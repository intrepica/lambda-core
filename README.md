# Lambda Core

![Architecture](https://github.com/intrepica/lambda-core/LambdaCoreArch.png)

### Single page app

Install dependencies

```bash
$ npm install
```

You can run webpack build using this command: 

```bash
$ npm run build
```

To start a dev server with hot reloading: 

```bash
$ npm run dev
```

Open the web browser to `http://localhost:8080/`

### AWS Lambda

```bash
$ npm install -g gulp
```

```bash
$ gulp deploy --match=** --env=staging --lambdaRole=arn:aws:iam::xxxxxx:role/xxx 
```

####Command line options

* **--handlerPath** *prefix to match path. Defaults to ./lambda/handlers/*
* **--dist** *path to dist dir. Defaults to ./lambda/dist/*
* **--configsPath** *path to configs dir. Defaults to ./lambda/configs/*
* **--match** *match packages using [node-glob](https://www.npmjs.com/package/glob). It looks for [handlerPath]/[match]/package.json*
* **--env** *adds env to name of lambda and uses env to lookup .env file in [configsPath]/.env.[env]*
* **--lambdaRole** *needed when creating new lambdas*