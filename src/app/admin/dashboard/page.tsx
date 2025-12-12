import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getTotalPatients } from "@/lib/patient-api";
import {
  Users,
  Droplet,
  FileText,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

async function getStats() {
  const [totalDonors, totalRequests, recentRequests, recentLogs] =
    await Promise.all([
      prisma.user.count(),
      prisma.donorRequest.count(),
      prisma.donorRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          donor: {
            select: { firstName: true, lastName: true, city: true },
          },
        },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  let totalPatients = 0;
  try {
    totalPatients = await getTotalPatients();
  } catch (e) {
    console.error("Failed to fetch patients from API");
  }

  return { totalDonors, totalRequests, recentRequests, recentLogs, totalPatients };
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="flex">
        <aside className="w-64 bg-secondary-900 min-h-screen p-6">
          <div className="flex items-center gap-2 mb-8">
            <Droplet className="w-8 h-8 text-primary-400" />
            <span className="text-xl font-bold text-white">Admin</span>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-2 bg-secondary-800 text-white rounded-lg"
            >
              <Activity className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/donors"
              className="flex items-center gap-3 px-4 py-2 text-secondary-300 hover:bg-secondary-800 rounded-lg"
            >
              <Users className="w-5 h-5" />
              Donors
            </Link>
            <Link
              href="/admin/requests"
              className="flex items-center gap-3 px-4 py-2 text-secondary-300 hover:bg-secondary-800 rounded-lg"
            >
              <FileText className="w-5 h-5" />
              Requests
            </Link>
            <Link
              href="/admin/logs"
              className="flex items-center gap-3 px-4 py-2 text-secondary-300 hover:bg-secondary-800 rounded-lg"
            >
              <Clock className="w-5 h-5" />
              Audit Logs
            </Link>
          </nav>

          <div className="absolute bottom-6 left-6">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-secondary-400 hover:text-white text-sm"
              >
                Logout
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Total Donors</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {stats.totalDonors}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">API Patients</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {stats.totalPatients}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Total Requests</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {stats.totalRequests}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Active Today</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {stats.recentRequests.length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-lg font-bold text-secondary-900 mb-4">
                Recent Requests
              </h2>
              <div className="space-y-4">
                {stats.recentRequests.length === 0 ? (
                  <p className="text-secondary-500 text-sm">No requests yet</p>
                ) : (
                  stats.recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-secondary-900">
                          {request.requesterName}
                        </p>
                        <p className="text-sm text-secondary-500">
                          Requested {request.donor.firstName}{" "}
                          {request.donor.lastName}
                        </p>
                      </div>
                      <span className="text-xs text-secondary-400">
                        {formatDateTime(request.createdAt)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-bold text-secondary-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {stats.recentLogs.length === 0 ? (
                  <p className="text-secondary-500 text-sm">No activity yet</p>
                ) : (
                  stats.recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-secondary-900">
                          {log.action.replace(/_/g, " ")}
                        </p>
                        <p className="text-sm text-secondary-500">
                          {log.entityType}
                        </p>
                      </div>
                      <span className="text-xs text-secondary-400">
                        {formatDateTime(log.createdAt)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
