const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "interview-dummy-secret"

function pad(prefix, length) {
  return prefix + "x".repeat(Math.max(0, length - prefix.length))
}

function generateSessionToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      userType: "MAIN_USER",
      google: {
        access_token: pad("ya29.", 900),
        refresh_token: pad("1//0", 500),
        id_token: pad("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.", 1100),
      },
      scopes: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/business.manage",
        "https://www.googleapis.com/auth/drive.file",
      ],
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

function verifySessionToken(token) {
  if (!token) return null

  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateSessionToken,
  verifySessionToken,
}
