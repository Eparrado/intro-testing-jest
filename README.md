# Boilerplate para tests con Mocha y ES6

Este repo contiene la base inicial para ejecutar tests con Mocha y ES6.


## Instalación

Abrimos la terminal y, con el comando que aparece a continuación, clonamos el repositorio en nuestro ordenador:

```
git clone https://github.com/adalab/boilerplate-testing-es6-mocha nombreDeTuProyecto
```

Una vez clonado el repositorio nos situamos dentro de él y ejecutamos `npm install` para instalar las dependecias necesarias

```
cd nombreDeTuProyecto
npm install
```


## Uso

Una vez hayas clonado el repositorio e instalado las dependencias solo tienes que ejecutar el comando `npm test` para ejecutar los tests y ver si pasan. Si quieres que los tests se ejecuten cada vez que haces un cambio en un archivo, puedes utilizar `npm run test:watch`.

Si ejecutas el comando `npm run test:watch` y quieres pararlo en algún momento, puedes hacerlo pulsando `control` + `C`.

**IMPORTANTE:** Al ejecutar el comando de `npm test` o `npm test:watch` solo se ejecutarán los tests que estén dentro de la carpeta `/test`. Puedes añadir tantos archivos como quieras a la carpeta test (o subcarpetas dentro de esta) y todos se ejecutarán pero es importante que estén situados todos dentro de esa carpeta.

En la carpeta test hay un archivo llamado `index.js`, ese archivo es un ejemplo y puedes borrarlo si lo deseas.


## Falta algo?

Echas de menos que el kit haga algo en concreto? Pidelo sin problema a través de los Issues o si te animas a mejorarlo mándanos un PR :)


## Licencia

[ISC](https://github.com/adalab/boilerplate-testing-es6-mocha/blob/master/LICENSE)
