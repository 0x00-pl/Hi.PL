import path from 'path'

export default {
    entry: './main.js',
    output: {
        path: __dirname+'/build/Release',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel'
        },{
            test: /.css$/,
            loader: 'style!css'
        },{
            test: /.ttf|woff2?|eot|svg$/,
            loader: 'file'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./node_modules/bootstrap/dist/fonts')
        ]
    }
}
