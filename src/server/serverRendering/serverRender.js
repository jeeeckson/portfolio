import routes from "../../shared/routes";
import serialize from "serialize-javascript";
import {renderToString} from "react-dom/server";
import React from "react";
import htmlReplace from "../htmlReplace";
import App from "../../shared/App";
import {StaticRouter, matchPath} from "react-router-dom";

export default (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

    const promise = activeRoute && activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

    return promise.then((data) => {
        const context = {data};

        res.send(htmlReplace(serialize(data), renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        )));
    }).catch(next);
};