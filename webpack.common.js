const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'app.jsx'),
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: path.join('bundle.[contentHash].js'),
        hashDigestLength: 32,
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src'),
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [],
};
