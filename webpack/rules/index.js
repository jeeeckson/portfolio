const image = require('./image');
const javascript = require('./javascript');
const css = require('./css');
const video = require('./video');
const typeScript = require('./typeScript');

module.exports = ({production = false, browser = false} = {}) => (
    [
        javascript({production, browser}),
        css({production, browser}),
        image(),
        typeScript(),
        video()
    ]
);
