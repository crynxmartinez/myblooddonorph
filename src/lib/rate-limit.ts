import prisma from "./prisma";

const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in ms

export async function checkRateLimit(
  ipAddress: string,
  action: string,
  maxRequests: number = 1
): Promise<{ allowed: boolean; remainingTime?: number }> {
  const now = new Date();

  // Clean up expired rate limits
  await prisma.rateLimit.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });

  // Check existing rate limit
  const existing = await prisma.rateLimit.findUnique({
    where: {
      ipAddress_action: {
        ipAddress,
        action,
      },
    },
  });

  if (existing) {
    if (existing.count >= maxRequests) {
      const remainingTime = existing.expiresAt.getTime() - now.getTime();
      return { allowed: false, remainingTime };
    }

    // Increment count
    await prisma.rateLimit.update({
      where: { id: existing.id },
      data: { count: existing.count + 1 },
    });

    return { allowed: true };
  }

  // Create new rate limit entry
  await prisma.rateLimit.create({
    data: {
      ipAddress,
      action,
      count: 1,
      expiresAt: new Date(now.getTime() + RATE_LIMIT_WINDOW),
    },
  });

  return { allowed: true };
}

export async function getRemainingCooldown(
  ipAddress: string,
  action: string
): Promise<number | null> {
  const existing = await prisma.rateLimit.findUnique({
    where: {
      ipAddress_action: {
        ipAddress,
        action,
      },
    },
  });

  if (!existing || existing.expiresAt < new Date()) {
    return null;
  }

  return existing.expiresAt.getTime() - Date.now();
}

export function formatRemainingTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
