# DanhKhoiFrameworkFE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## How to run ESLint for convention code

- Install extension for VSCode: [ESLint](https://eslint.org) & [Prettier Code Formater](https://prettier.io)
- Command run lint:
  - Run `ng lint` to check error
  - Run `ng lint --fix` to check error & fix basic error

## Husky hook

- Usage: check convention code before commit/pull/push
- [Document](https://www.npmjs.com/package/husky)
- To add/update a hook: `npx husky set [hook] "[command]"`
  - example: `npx husky set .husky/pre-commit "ng lint"`
