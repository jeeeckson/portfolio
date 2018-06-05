export default (first, second) => {
    return `<!DOCTYPE html>
          <html>
                <head>
                  <title>SSR with RR</title>
                  <script src="/bundle.js" defer></script>
                  <script>window.__INITIAL_DATA__ = ${first}</script>
                </head>
        
                <body>
                  <div id="app">${second}</div>
                </body>
          </html>
    `
};