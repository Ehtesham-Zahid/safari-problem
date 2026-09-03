const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
const authUrl = process.env.AUTH_URL || "http://localhost:3001"
const frontendPort = Number(new URL(frontendUrl).port) || 3000
const authPort = Number(new URL(authUrl).port) || 3001

module.exports = {
  frontendUrl,
  authUrl,
  frontendPort,
  authPort,
}
