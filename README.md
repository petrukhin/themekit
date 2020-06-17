[![themekit](https://user-images.githubusercontent.com/7934638/83977761-b6831600-a90b-11ea-84a4-8c4dd3b60cc1.png)](https://github.com/yarastqt/themekit)

Themkit is a build system for design-tokens on any platform. This system is based on redefinition levels, which allows you to describe platform-specific values in a single place. Themkit provides you to extend existing themes in order to supplement or redefine existing tokens, it also allows you to use the basic theme set and add it to the service.

## Installation

```sh
# via npm
npm i -DE @yandex/themekit
# or yarn
yarn add --dev @yandex/themekit
```

## Usage

На данный момент темкит доступен только в качестве CLI инструмента.

Сборка всех тем:

```sh
themekit build
```

Сборка тем в режиме наблюдения:

```sh
themekit build -w
```

## Конфигурация

### Настройка проекта

Для начала необходимо создать файл конфигурации `themekit.config.json`, поддерживается так же и js формат.

```json
{
  "entry": {
    "default": "./src/theme/default.theme.json"
  },
  "output": {
    "css": {
      "transforms": ["attribute/cti", "time/seconds", "color/css", "name/cti/kebab"],
      "buildPath": "./src/...",
      "files": [
        {
          "destination": "[entry]/[platform]/color.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

#### Интерфейс конфига

<!-- TODO: стоит сказать про entry + platform -->

```ts
{
  /**
   *
   */
  entry: Record<string, string>

  /**
   *
   */
  output: Record<string, {
    transforms: string[]
    transformGroup?: string /// ????
    buildPath: string
    files: Array<{ destination: string, format: string, filter: any }>
  }>
}
```

### Настройка темы

Базовая настройка темы состоит из секции `sources` в которой перечислены какие токены должны ходить в данную тему (разрешено указывать полный путь или glob).

```json
{
  "sources": [
    "./src/theme/tokens/typography.tokens.yml",
    "./src/theme/tokens/color-light.tokens.yml",
    "./src/components/**/*.tokens.yml"
  ]
}
```

#### Интерфейс темы

```ts
{
  extends?: string

  /**
   *
   * @default ['common']
   */
  platforms?: Array<'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone'>

  /**
   * Whitepapers XXX (only for css)
   */
  whitepaper?: Record<string, string>

  /**
   * Mappers list
   */
  mappers?: string[]

  /**
   * Sources list
   */
  sources: string[]
}
```

### Токены

Токены могут быть написаны как в json так и yaml формате:

```yml
component:
  type:
    base:
      fillColor:
        value: '#000'
      typoColor:
        value: '#fff'
    danger:
      fillColor:
        value: '#f00'
      typoColor:
        value: '#fff'
```

#### Интерфейс токена

```ts
{
  /**
   * Token value
   */
  value: string

  /**
   * Token group
   */
  group?: string

  /**
   * Token comment
   */
  comment?: string
}
```

<!-- ### Mappings

Бывают случаи когда необходимо сохранить обратную совместимость... -->

### Features

color-process
mappings

## License

[MPL-2.0][license]

[license]: https://github.com/yarastqt/themekit/blob/master/LICENSE.md
[examples]: https://github.com/yarastqt/themekit/tree/master/examples
