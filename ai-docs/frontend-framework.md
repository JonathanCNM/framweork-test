# Frontend UI Framework Rules

Este proyecto usa el framework interno `lola-framework-ui-test`.

## Reglas

- NO crear CSS manual
- NO usar styled-components
- NO usar inline styles
- No usar Tailwind
- SOLO usar componentes del framework

## Instalación

- React y React-dom version 18.3.1
- npm i lola-framework-ui-test@latest
- main.tsx: import "lola-framework-ui-test/src/styles";

## Colores

Los colores se obtienen desde:

Hay una configuración de colores las cuales siempre se van a relacionar en una variable llamada "colorConfig", esta variable contiene los siguientes valores que ya el framework `lola-framework-ui-test` conoce

background: background del componente
iconColors: Color de los iconos principales
backgroundIcon: Background de los iconos principales
title: Color del titulos
subtitile: Colore de subtitulos
bodyCopy: Color del texto normal (contenido)
footerColor: Color del texto del footer
backgroundBtn: Background del componente Button

- siempre que se use un boton va esta propiedad
  textColorBtn: Color del texto del componente Button
- siempre que se use un boton va esta propiedad
  dropzoneColors: Color alternativo de los iconos
  themeType: Para verificar que tipo de tema es "light" || "dark"

## Layout config
Usar en App.tsx al configurar
- <Page
    font={{
      cdn: reedTheme.font.fontcdn,
      name: reedTheme.font.fontfamily,
    }}
  >

## Layout
tipos de Layout
primaryMeshGradientView: primary
specialView: especial
dataView: para informacion
whiteView: por default
errorView: error

Usar siempre:
- <AuraLayout colorConfig={colorConfig}>
  - <Layout.Header>
  - <Layout.Content>
    - content [primary | especial | para informacion | por default | error]
  <Layout.Footer>
    <Button>

## Layout para primaryMeshGradientView o specialView
const colorConfig = theme.primaryMeshGradientView o theme.specialView
en el apartado de "content"
... layout
  - <ElevatedCircle>
    - <RightIcon size={66} />
  - <PageTitle>
  - <BodyCopy>
  - <section>
  - ...

## Layout para errorView
const colorConfig = theme.errorView
en el apartado de "content"
... layout
  - <ElevatedCircle>
    - <WarningIcon size={66} />
  - <PageTitle>
  - <BodyCopy>
  - ...

## Layout para dataView o whiteView
const colorConfig = theme.dataView o theme.whiteView
en el apartado de "content"
... layout
  - <section className="content">
  - ...


## Componentes base

Botones:
<Button
  showIcon
  size="large"
  background={backgroundBtn}
  color={textColorBtn}
>
  button
</Button>

Inputs:
 <InputField
  name="name"
  onChange={handleInputChange}
  value={value}
  label={label}
/>

Navbar:
<Navbar
  color={title}
  title="title"
/>

PageTitle
<PageTitle
  highlight="title"
  highlightColor={title}
  secudnary="subtitle"
  secudnaryColor={subtitile}
/>

BodyCopy
<BodyCopy textColor={bodyCopy}>
  text
</BodyCopy>