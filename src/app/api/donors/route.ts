import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const bloodType = searchParams.get("bloodType");

    const where: any = {
      isAvailable: true,
      consentContact: true,
    };

    if (city) {
      where.city = city;
    }

    if (bloodType) {
      where.bloodType = bloodType;
    }

    const donors = await prisma.user.findMany({
      where,
      select: {
        id: true,
        patientId: true,
        city: true,
        bloodType: true,
        rhFactor: true,
        isAvailable: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedDonors = donors.map((donor) => ({
      id: donor.id,
      visibleId: donor.patientId || `DON-${donor.id.slice(0, 8).toUpperCase()}`,
      city: donor.city,
      bloodType: donor.bloodType,
      rhFactor: donor.rhFactor,
      isAvailable: donor.isAvailable,
    }));

    return NextResponse.json({ success: true, data: formattedDonors });
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
