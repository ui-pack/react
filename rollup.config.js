import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  external: ['react'],
  input: '_src/components/index',
  output: [],
  plugins: [
    nodeResolve({ preferBuiltins: false }),
    commonjs({
      include: /node_modules/
    }),
    babel({ babelHelpers: 'bundled' })
  ]
}
