# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Instalación](#2-instalación)
* [3. Realización del proyecto](#3-realización-del-proyecto)
* [4. Uso](#4-uso)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://node.org/favicon.ico), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md links](https://user-images.githubusercontent.com/105660480/190840592-163553a7-c1f3-4314-998c-1d3954dd92c1.png)

## 2. Instalación

Para instalar la librería se deberá instalar el siguiente comando en la terminal.

``` js
npm i access-md-links
```

## 3. Realización del proyecto

### A) JavaScript API

![Diagrama de flujo API](https://user-images.githubusercontent.com/105660480/190840764-f5c273e0-ec00-4f43-9120-49423246ff51.png)

### B) CLI (Command Line Interface - Interfaz de Línea de Comando)

![Diagrama de flujo CLI](https://user-images.githubusercontent.com/105660480/190840928-eaf408f3-c99d-44b1-8401-263e55f4615a.png)

## 4. Uso

Para la ejecución se debe ingresar desde la terminal los comandos con el siguiente formato: 

`md-links <path-to-file> [options]`

El comportamiento por defecto no debe validar si las URLs responden ok o no, solo debe identificar el archivo markdown (a partir de la ruta que recibe como argumento), analizar el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

![without option](https://user-images.githubusercontent.com/105660480/190841179-e98ea84f-430f-4451-a239-25ac157b85ed.png)

### --help
Para visualizar la tabla de ayuda con información sobre los comandos utilice la opción --help.

![--help](https://user-images.githubusercontent.com/105660480/190841090-8a92ec9e-329d-4b02-b445-e9bfeea9080b.png)

### --validate
Para realizar peticiones HTTP y averiguar si el link funciona o no utilice la opción --validate.

![--validate](https://user-images.githubusercontent.com/105660480/190841282-33846008-aa82-47cb-8de8-342ce3f454f5.png)

### --stats
Para verificar las estadísticas básicas de los links utilice la opción --stats.

![--stats](https://user-images.githubusercontent.com/105660480/190841404-1d6ac359-8d90-4913-a9c3-c6d009a7286c.png)

### --stats --validate or --validate --stats
Para obtener estadísticas que necesiten de los resultados de la validación utilice la combinación de los comandos --stats y --validate.

![stats and validate](https://user-images.githubusercontent.com/105660480/190841430-aa8d6dee-f787-45e1-8e64-c6fa67b288b2.png)

## ¿error?
En caso de existir algún error durante la validación de la ruta ingresada se mostrará un mensaje en consola.

![error](https://user-images.githubusercontent.com/105660480/190841466-80e68ea4-97b5-455b-9287-ee591b59c52d.png)