const rateLimit = require("express-rate-limit")

const createLimiter = ({ windowMs, limit, message, skip }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    skip,
    handler: (_, res) => {
      res.status(429).json({
        success: false,
        message
      })
    }
  })

const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 80,
  message: "Too many auth attempts, please wait and try again."
})

const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  message: "Too many requests, please try again later.",
  // Never block logout/status endpoints so users can always recover sessions.
  skip: (req) => req.path === "/auth/logout" || req.path.startsWith("/test")
})

module.exports = {
  apiLimiter,
  authLimiter
}