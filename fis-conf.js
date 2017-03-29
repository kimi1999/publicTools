// default settings. fis3 release

// Global start
fis.match('*.{js,css}', {
    useHash: true
});

fis.match('::image', {
    useHash: true
});

fis.match('*.js', {
    //optimizer: fis.plugin('uglify-js')
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
});


fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

// Global end

// default media is `dev`
fis.media('dev')
    .match('*', {
        useHash: false,
        optimizer: null
    });

// extends GLOBAL config
fis.media('production')
    .match('js/*.js',{
        //release: '/scripts/all.js',
        useHash: false
    })
    .match('images/*.{png,jpg,gif,jpeg,cur}', {
        release: "$0",
        useHash: false
    })
    // .match('images/*.png', {
    //   optimizer: fis.plugin('png-compressor'),
    //   release: 'images/all-icon.png'
    // })
    .match('js/**/*.js',{
        useHash: false
    })
    .match('js/**/*.css',{
        useHash: false
    })
    .match('*.html',{
        release: '$0',
        useHash: false
    })
    .match('css/*.less',{
        release: '$0',
        parser: fis.plugin('less'),
        preprocessor: fis.plugin("cssgrace"),
        postprocessor: fis.plugin("autoprefixer"),
        rExt: '.css',
        optimizer: fis.plugin('clean-css')
    })
    .match('css/*.css',{
        useHash: false
    });

//
// fis.config.merge({
//   deploy: {
//     remote: {
//       receiver: 'http://127.0.0.1:8080',	// 接收服务的地址
//       from: '/',
//       to: '/data-4-products'	// 服务器上部署的的路径
//     }
//   }
// });
