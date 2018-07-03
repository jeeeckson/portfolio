//const createStaticAssets = __PRODUCTION__ ? require('./prod') : require('./dev');
const createStaticAssets = require('./dev');

export default createStaticAssets;
