type RateLimitOptions = {
  maxRequests?: number;
  windowMs?: number;
};

type RateLimitResult = {
  success: boolean;
  retryAfterMs: number;
  remaining: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function cleanup() {
  const current = now();
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= current) {
      buckets.delete(key);
    }
  }
}

export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = {},
): Promise<RateLimitResult> {
  const maxRequests = options.maxRequests ?? 10;
  const windowMs = options.windowMs ?? 60_000;
  const current = now();

  cleanup();

  const bucket = buckets.get(identifier);

  if (!bucket || bucket.resetAt <= current) {
    buckets.set(identifier, { count: 1, resetAt: current + windowMs });
    return {
      success: true,
      retryAfterMs: windowMs,
      remaining: Math.max(0, maxRequests - 1),
    };
  }

  if (bucket.count >= maxRequests) {
    return {
      success: false,
      retryAfterMs: Math.max(0, bucket.resetAt - current),
      remaining: 0,
    };
  }

  bucket.count += 1;
  buckets.set(identifier, bucket);

  return {
    success: true,
    retryAfterMs: Math.max(0, bucket.resetAt - current),
    remaining: Math.max(0, maxRequests - bucket.count),
  };
}
