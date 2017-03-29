fis.hook('module', {
    mode: 'commonJs'
});

fis.match('::packager', {
    // npm install -g fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: [
        fis.plugin('loader', {
            resourceType: 'mod',
            useInlineMap: true // 资源映射表内嵌
        }),
        fis.plugin('langhash')
    ],
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '50'
    })
});

fis.match('css/**.less', {
    parser: fis.plugin('less'),
    preprocessor: fis.plugin("cssgrace"),
    postprocessor: fis.plugin("autoprefixer"),
    useSprite: true,
    rExt: '.css'
});

fis.match("js/(*).js", {
    isMod: true,
    id: "$1"
});

fis.match("js/**/(*).js", {
    isMod: true,
    id: "$1",
    // modelhook会自动忽略UMD的东西，强制warpper
    postprocessor: fis.plugin('jswrapper', {
        type: 'amd'
    })
});

fis.match("js/mod/mod.js", {
    isMod: false,
    packOrder: -100
});
fis.match("js/lib/umeditor/**/*.js", {
    isMod: false,
    packOrder: -100
});
fis.match("widgets/**/(*).js", {
    isMod: true,
    id: "$1"
});

fis.match("**.tpl", {
    release: false
}).match('*.swf', {
    release: "/statics/uhome/$1",
});


fis.media("production").match('**/*.js', {
    packTo: '/static/pkg/all.js', //css打成一个包
    optimizer: fis.plugin('uglify-js'),
    useHash: true
}).match('*.png', {
    optimizer: fis.plugin('png-compressor')
}).match('image', {
    useHash: true
}).match('**.less', {
    optimizer: fis.plugin('clean-css'),
    useHash: true
})


fis.media("testing").match('(*).js', {
    release: "/statics/uhome/$1",
    // useHash: true
}).match('*.png', {
    optimizer: fis.plugin('png-compressor')
}).match('(*).{png,jpg,gif,jpeg,cur}', {
    release: "/statics/images/uhome/$1",
    // useHash: true
}).match('(*).less', {
    optimizer: fis.plugin('clean-css'),
    release: "/statics/uhome/$1"
}).match("index.html", {
    release: false
}).match("(uhome).html", {
    release: "/application/views/uhome/index",
    rExt: '.php'
}).match("lang/(*).js", {
    isMod: false,
    // useHash: false,
    packTo: null
})

fis.media("dev").match('(*).js', {
    release: "/statics/uhome/$1",
}).match('*.png', {
    optimizer: fis.plugin('png-compressor')
}).match('images/(**)', {
    release: "/statics/images/uhome/$1",
}).match('css/(**).png', {
    release: "/statics/images/uhome/$1",
}).match('fonts/(**)', {
    release: "/statics/uhome/fonts/$1",
}).match('(*).less', {
    //packTo: '/statics/pkg/all.css', //css打成一个包
    optimizer: fis.plugin('clean-css'),
    release: "/statics/uhome/$1"
}).match("index.html", {
    release: false
}).match("(fake).html", {
    release: "/application/views/test/index",
    rExt: '.php'
}).match("(uhome).html", {
    release: "/application/views/uhome/index",
    rExt: '.php'
}).match("(feed).html", {
    release: "/application/views/uhome/feed",
    rExt: '.php'
}).match("(feed-blog).html", {
    release: "/application/views/uhome/blog",
    rExt: '.php'
}).match("lang/(*).js", {
    isMod: false,
    useHash: false,
    packTo: null
}).match("(feed_lists_view).html", {
    release: "/application/views/uhome/feed_lists_view",
    rExt: '.php'
}).match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://10.0.1.11:8999/receiver',
        to: '/home/jimi_zhang/web' // 注意这个是指的是测试机器的路径，而非本地机器
    })
})