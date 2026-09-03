const users = [
  {
    id: "user_alex",
    email: "alex@acme.test",
    password: "password123",
    name: "Alex Rivera",
    role: "owner",
  },
  {
    id: "user_sam",
    email: "sam@acme.test",
    password: "password123",
    name: "Sam Chen",
    role: "editor",
  },
]

function findUserByEmail(email) {
  return users.find(
    (user) => user.email.toLowerCase() === String(email || "").toLowerCase(),
  )
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

module.exports = {
  users,
  findUserByEmail,
  toPublicUser,
}
