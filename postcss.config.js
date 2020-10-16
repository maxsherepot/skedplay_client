module.exports = {
    plugins: [
        require('postcss-easy-import'),
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-nested'),
        require('postcss-custom-properties'),
        require('autoprefixer'),
    ]
}