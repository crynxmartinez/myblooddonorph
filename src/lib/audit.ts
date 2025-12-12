import prisma from "./prisma";

export type AuditAction =
  | "USER_REGISTER"
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "ADMIN_LOGIN"
  | "ADMIN_LOGOUT"
  | "DONOR_INFO_REQUEST"
  | "DONOR_INFO_VIEWED"
  | "DONOR_STATUS_CHANGE"
  | "SETTINGS_UPDATE";

export async function createAuditLog(params: {
  action: AuditAction;
  entityType: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  userId?: string;
  adminId?: string;
}): Promise<void> {
  await prisma.auditLog.create({
    data: {
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details,
      ipAddress: params.ipAddress,
      userId: params.userId,
      adminId: params.adminId,
    },
  });
}

export async function getRecentAuditLogs(limit: number = 50) {
  return prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { email: true, firstName: true, lastName: true },
      },
      admin: {
        select: { email: true, name: true },
      },
    },
  });
}
