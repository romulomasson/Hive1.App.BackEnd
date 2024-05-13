const path = require('path')

module.exports = {
    entry: './dist/server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js'
    },
    target: 'node',
    externals: { typeorm: 'commonjs typeorm' },
    resolve: {
        extensions: ['.js', '.json', '.ts']
    },
}