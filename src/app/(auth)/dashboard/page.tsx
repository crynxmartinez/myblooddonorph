import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Droplet,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getFullBloodType, formatDate } from "@/lib/utils";

async function getUserData(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      city: true,
      bloodType: true,
      rhFactor: true,
      dateOfBirth: true,
      isAvailable: true,
      isVerified: true,
      patientId: true,
      createdAt: true,
      _count: {
        select: {
          requestsReceived: true,
        },
      },
    },
  });
}

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserData(session.id);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Droplet className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-secondary-900">
                MyBloodDonorPH
              </span>
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            Welcome, {user.firstName}!
          </h1>
          <p className="text-secondary-600 mt-1">
            Manage your donor profile and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-secondary-500">
                      Donor ID: {user.patientId || `DON-${user.id.slice(0, 8).toUpperCase()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.isAvailable ? (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      Unavailable
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-secondary-600">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-secondary-600">
                    <Phone className="w-5 h-5" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-secondary-600">
                  <MapPin className="w-5 h-5" />
                  <span>{user.city}</span>
                </div>
                {user.dateOfBirth && (
                  <div className="flex items-center gap-3 text-secondary-600">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(user.dateOfBirth)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-primary-100 rounded-lg">
                    <p className="text-sm text-primary-600">Blood Type</p>
                    <p className="text-2xl font-bold text-primary-700">
                      {getFullBloodType(user.bloodType, user.rhFactor)}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-secondary-100 rounded-lg">
                    <p className="text-sm text-secondary-600">Member Since</p>
                    <p className="text-lg font-semibold text-secondary-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-secondary-900 mb-4">
                Donation Requests Received
              </h3>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplet className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-3xl font-bold text-secondary-900">
                  {user._count.requestsReceived}
                </p>
                <p className="text-secondary-500">
                  People have requested your contact info
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-bold text-secondary-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/donors">
                  <Button variant="outline" className="w-full justify-start">
                    <Droplet className="w-4 h-4 mr-2" />
                    Find Other Donors
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-start" disabled>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile (Coming Soon)
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-secondary-900 mb-4">
                Verification Status
              </h3>
              {user.isVerified ? (
                <div className="flex items-center gap-3 text-green-700">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Verified Donor</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 text-yellow-700 mb-2">
                    <XCircle className="w-6 h-6" />
                    <span className="font-medium">Pending Verification</span>
                  </div>
                  <p className="text-sm text-secondary-500">
                    Your account is active but not yet verified. Verification
                    helps build trust with requesters.
                  </p>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-secondary-900 mb-4">
                Availability
              </h3>
              <p className="text-secondary-600 text-sm mb-4">
                Toggle your availability to let people know if you can donate.
              </p>
              <div
                className={`p-4 rounded-lg ${
                  user.isAvailable
                    ? "bg-green-50 border border-green-200"
                    : "bg-secondary-50 border border-secondary-200"
                }`}
              >
                <p className="font-medium">
                  {user.isAvailable
                    ? "You are currently available for donation requests"
                    : "You are currently unavailable"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
