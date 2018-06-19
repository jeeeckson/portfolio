const PATHS = require('../paths');

module.exports = () => ({
    test: /\.ts?$/,
    loader: 'ts-loader',
    exclude: PATHS.modules,
    include: PATHS.typescript
});


