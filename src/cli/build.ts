import { resolve } from 'path'
import { Command, flags } from '@oclif/command'
import { watch } from 'chokidar'

import { loadConfig } from '../core/config'
import { build } from '../core/build'
import { loadTheme } from '../core/load-theme'
import { throttle } from '../core/utils'

type Flags = { config: string; watch: boolean }

export default class Build extends Command {
  static description = 'Builds themes for configured formats.'

  static flags = {
    config: flags.string({
      char: 'c',
      description: 'The path to a themekit config file.',
      default: 'themekit.config.json',
    }),
    watch: flags.boolean({
      char: 'w',
      description: 'Auto rebuilds themes after change sources.',
    }),
  }

  async run() {
    const { flags } = this.parse<Flags, any>(Build)
    const config = await loadConfig(resolve(flags.config))

    await build(config)

    if (flags.watch) {
      this.log('\nWatching for file changes.')

      const themes = []

      for (const key in config.entry) {
        const theme = await loadTheme(config.entry[key])
        themes.push(...theme.mappers, ...theme.sources.flat())
      }

      const watcher = watch(themes, { ignoreInitial: true })
      const onChange = throttle(async () => {
        this.clear()
        await build(config)
        this.log('\nWatching for file changes.')
      }, 500)

      watcher
        .on('unlink', onChange)
        .on('add', onChange)
        .on('change', onChange)
    }
  }

  private clear() {
    // eslint-disable-next-line no-console
    console.clear()
  }
}
