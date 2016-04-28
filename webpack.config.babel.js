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
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
