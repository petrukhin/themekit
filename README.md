[![themekit](https://user-images.githubusercontent.com/7934638/83977761-b6831600-a90b-11ea-84a4-8c4dd3b60cc1.png)](https://github.com/yarastqt/themekit)

Themkit is a build system for design-tokens on any platform. This system is based on redefinition levels, which allows you to describe platform-specific values in a single place. Themkit provides you to extend existing themes in order to supplement or redefine existing tokens, it also allows you to use the basic theme set and add it to the service.

## Features

* Поддержка платформ (desktop, touch, etc...) для тем.
* Возможность наследоваться от существующих тем.
* Возможность мапинга для названий токенов (css and flat-json only).
* Работа с цветом
* Whitepaper

## Installation

```sh
# via npm
npm i -DE @yandex/themekit
# or yarn
yarn add --dev @yandex/themekit
```

## Usage

A themekit is only available as a CLI tool.

### Build

Builds all themes:

```sh
themekit build
```

#### Options

| Option      | Description                                | Default              |
|-------------|--------------------------------------------|----------------------|
| -w --watch  | Auto rebuilds themes after change sources. | —                    |
| -c --config | The path to a themekit config file.        | themekit.config.json |
| -h --help   | Show help information.                     | —                    |

## Starting

### Common configuration

First, you need to create a config file `themekit.config.json`:

```json
{
  "entry": {
    "default": "./src/theme/default.theme.json"
  },
  "output": {
    "css": {
      "transforms": ["attribute/cti", "time/seconds", "color/css", "name/cti/kebab"],
      "buildPath": "./src/theme/themes",
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

#### Interface

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
    /**
     *
     */
    transforms: string[]
    /**
     *
     */
    transformGroup?: string
    /**
     *
     */
    buildPath: string
    /**
     *
     */
    files: Array<{
      /**
       * Output filepath, also supports helper placeholders:
       * [entry] — theme name
       * [platform] — platform name
       */
      destination: string
      /**
       *
       */
      format: string
      /**
       *
       */
      filter: any
    }>
  }>
}
```

### Theme configuration

The basic theme configuration consists of the sources section, which lists which tokens should include to this theme (you can specify the full path or glob).

```json
{
  "sources": [
    "./src/theme/tokens/typography.tokens.yml",
    "./src/theme/tokens/color-light.tokens.yml",
    "./src/components/**/*.tokens.yml"
  ]
}
```

#### Interface

```ts
{
  /**
   *
   */
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
        value: "#000"
      typoColor:
        value: "#fff"
    danger:
      fillColor:
        value: "#f00"
      typoColor:
        value: "#fff"
```

#### Interface

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

whitepaper
color-process
mappings

## License

[MPL-2.0][license]

[license]: https://github.com/yarastqt/themekit/blob/master/LICENSE.md
[examples]: https://github.com/yarastqt/themekit/tree/master/examples
