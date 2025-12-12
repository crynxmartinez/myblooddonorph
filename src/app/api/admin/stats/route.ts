import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getTotalPatients } from "@/lib/patient-api";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [totalDonors, totalRequests, todayRequests] = await Promise.all([
      prisma.user.count(),
      prisma.donorRequest.count(),
      prisma.donorRequest.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    let totalPatients = 0;
    try {
      totalPatients = await getTotalPatients();
    } catch (e) {
      console.error("Failed to fetch patients from API");
    }

    return NextResponse.json({
      success: true,
      data: {
        totalDonors,
        totalPatients,
        totalRequests,
        todayRequests,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
