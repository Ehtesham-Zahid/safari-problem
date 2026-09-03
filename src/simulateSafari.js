const SAFARI_URL_LIMIT = 2048

function toAbsoluteUrl(location, req) {
  if (location.startsWith("http://") || location.startsWith("https://")) {
    return location
  }

  return `${req.protocol}://${req.get("host")}${location}`
}

function simulateSafariUrlLimit(req, res, next) {
  if (process.env.SIMULATE_SAFARI_URL_LIMIT === "false") {
    return next()
  }

  const originalRedirect = res.redirect.bind(res)

  res.redirect = function redirectWithSafariLimit(statusOrUrl, url) {
    const hasStatus = typeof statusOrUrl === "number"
    const status = hasStatus ? statusOrUrl : 302
    let location = hasStatus ? url : statusOrUrl

    const absolute = toAbsoluteUrl(location, req)

    if (absolute.length > SAFARI_URL_LIMIT) {
      const queryIndex = location.indexOf("?")
      if (queryIndex === -1) {
        return originalRedirect(status, location)
      }

      const path = location.slice(0, queryIndex)
      const query = location.slice(queryIndex + 1)
      const absoluteWithoutQuery = toAbsoluteUrl(path, req)
      const remaining = SAFARI_URL_LIMIT - absoluteWithoutQuery.length - 1
      const truncatedQuery = remaining > 0 ? query.slice(0, remaining) : ""
      location = truncatedQuery ? `${path}?${truncatedQuery}` : path

      console.warn(
        `[safari-sim] truncated redirect from ${absolute.length} to ${
          toAbsoluteUrl(location, req).length
        } chars`,
      )
    }

    return originalRedirect(status, location)
  }

  next()
}

module.exports = { simulateSafariUrlLimit, SAFARI_URL_LIMIT }
