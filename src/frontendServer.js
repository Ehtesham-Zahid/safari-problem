const path = require("path")
const express = require("express")
const { frontendPort, authUrl } = require("./config")

const publicDir = path.join(__dirname, "..", "public")

function startFrontend() {
  const app = express()

  app.get("/config.js", (_req, res) => {
    res.type("js").send(
      `window.APP_CONFIG = ${JSON.stringify({ authUrl }, null, 2)};\n`,
    )
  })

  app.get("/", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"))
  })

  app.get("/authenticated", (_req, res) => {
    res.sendFile(path.join(publicDir, "authenticated.html"))
  })

  app.get("/dashboard", (_req, res) => {
    res.sendFile(path.join(publicDir, "dashboard.html"))
  })

  app.use(express.static(publicDir))

  app.listen(frontendPort, () => {
    console.log(`Frontend on http://localhost:${frontendPort}`)
  })
}

module.exports = { startFrontend }
