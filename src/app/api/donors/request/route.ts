import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkRateLimit, formatRemainingTime } from "@/lib/rate-limit";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    const body = await request.json();
    const {
      donorId,
      requesterName,
      requesterEmail,
      requesterPhone,
      requesterBloodType,
      hospitalName,
      purpose,
      consent,
    } = body;

    if (!donorId || !requesterName || !requesterEmail || !requesterPhone || 
        !requesterBloodType || !hospitalName || !purpose || !consent) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const rateCheck = await checkRateLimit(ip, `donor_request_${donorId}`, 1);
    
    if (!rateCheck.allowed) {
      const remainingTime = formatRemainingTime(rateCheck.remainingTime || 0);
      return NextResponse.json(
        { 
          success: false, 
          message: `You have already requested this donor's information. Please wait ${remainingTime} before requesting again.` 
        },
        { status: 429 }
      );
    }

    const donor = await prisma.user.findUnique({
      where: { id: donorId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        city: true,
        bloodType: true,
        rhFactor: true,
        isAvailable: true,
        consentContact: true,
      },
    });

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    if (!donor.isAvailable || !donor.consentContact) {
      return NextResponse.json(
        { success: false, message: "This donor is not available for contact" },
        { status: 400 }
      );
    }

    await prisma.donorRequest.create({
      data: {
        donorId,
        requesterName,
        requesterEmail,
        requesterPhone,
        requesterBloodType,
        hospitalName,
        purpose,
        ipAddress: ip,
        consentGiven: consent,
        consentTimestamp: new Date(),
        status: "approved",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    await createAuditLog({
      action: "DONOR_INFO_VIEWED",
      entityType: "User",
      entityId: donorId,
      details: JSON.stringify({
        requesterName,
        requesterEmail,
        hospitalName,
        purpose,
      }),
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      data: {
        name: `${donor.firstName} ${donor.lastName}`,
        email: donor.email,
        phone: donor.phone,
        city: donor.city,
        bloodType: donor.bloodType,
        rhFactor: donor.rhFactor,
      },
    });
  } catch (error) {
    console.error("Error processing donor request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
