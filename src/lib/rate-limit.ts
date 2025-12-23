// Simple in-memory rate limiter
// For production, use Redis-based solution

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

interface RateLimitConfig {
  windowMs: number  // Time window in milliseconds
  maxRequests: number  // Max requests per window
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 10 }
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // Create new entry
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    }
  }

  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    }
  }

  entry.count++
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  }
}

// Predefined rate limit configs
export const RATE_LIMITS = {
  // Contact form: 5 submissions per 15 minutes
  contact: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  // Login attempts: 5 per 15 minutes
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  // API calls: 100 per minute
  api: { windowMs: 60 * 1000, maxRequests: 100 },
  // Admin API: 200 per minute
  adminApi: { windowMs: 60 * 1000, maxRequests: 200 },
}
