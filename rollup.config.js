import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from 'rollup-plugin-multi-input'
import path from 'path'

export default {
  external: [
    'tty',
    'os',
    'path',
    'fs',
    'util',
    'url',
    'react',
    'react-dom',
    /@testing-library/,
    /@babel\/runtime/
  ],
  input: [
    // Exempt files like example.stories.js and example.test.js
    '_src/components/**/*[!.st].js'
  ],
  output: [
    {
      format: 'cjs',
      dir: '.',
      exports: 'named'
    },
  ],
  plugins: [
    nodeResolve({ preferBuiltins: false }),
    commonjs({
      include: /node_modules/
    }),
    babel({ babelHelpers: 'runtime' }),
    multiInput({
      relative: '_src',
      transformOutputPath: function(output, input) {
        const parentFolders = path.dirname(input).split(path.sep)
        // Remove the src/{hooks|components} directories
        let newDestination = parentFolders.slice(2, parentFolders.length)
        if(parentFolders.length === 2) {
          newDestination = []
        }
        let end = `${newDestination.join(path.sep)}/${path.basename(output)}`
        if(!newDestination.length) {
          end = path.basename(output)
        }
        return end
      }
    }),
  ],
  preserveEntrySignatures: 'strict',
}
