const mix = require('laravel-mix');

mix.autoload({
    jquery: ['$', 'window.jQuery', "jQuery", "window.$", "jquery", "window.jquery"],
    'vue': ['Vue', 'window.Vue'],
    'moment': ['moment', 'window.moment'],
})

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
