import typescript from 'rollup-plugin-typescript'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: './index.ts',
  plugins: [
    typescript(),
    uglify()
  ],
  targets: [{
    dest: './dist/bookmarklet.js', format: 'umd'
  }]
}
