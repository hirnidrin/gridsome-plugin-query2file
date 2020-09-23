const write = require('write')

module.exports = function query2file (api, options) {
  api.onBootstrap(async () => {
    // plugin options are
    // - either a single object for one single run: { query: '...', outfile: '...' }
    // - or an array of such objects for multiple runs: [ { }, { }, ... ]
    if (!Array.isArray(options)) {
      options = [options]
    }
    // map over and fire all queries, collect the promises into an array
    // see https://zellwk.com/blog/async-await-in-loops/ and https://stackoverflow.com/a/37576787
    const promises = options.map(async (item) => {
      try {
        const result = await api._app.graphql(item.query)
        write.sync(item.outfile, JSON.stringify(result.data))
        console.log(`Plugin query2file: OK write to ${item.outfile}`)
      } catch (e) {
        console.error(`Plugin query2file: KO write to ${item.outfile}`, e)
      }
    })
    // wait for all promises to finish
    await Promise.all(promises)
  })
}
