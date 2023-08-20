const config  = {
    mode: 'production',

    entry: {
        index: './src/js/index.js',
    },

    output: {        
        // path: path.join(__dirname, 'dist', 'js'), // сборка пути из имен директорий и файлов
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
}

module.exports = config;