import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { createPatient, updatePatientBloodProfile } from "@/lib/patient-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      city,
      bloodType,
      rhFactor,
      dateOfBirth,
      consentInfo,
      consentContact,
    } = body;

    if (!email || !password || !firstName || !lastName || !city || !bloodType) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    if (!consentInfo || !consentContact) {
      return NextResponse.json(
        { success: false, message: "You must agree to both consent statements" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    let patientId: string | null = null;
    try {
      const patientResponse = await createPatient({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        city,
        status: "Active",
      });

      if (patientResponse.success) {
        patientId = patientResponse.data.patientId;

        await updatePatientBloodProfile(patientResponse.data.id, {
          bloodType,
          rhFactor: rhFactor || "positive",
          verified: false,
        });
      }
    } catch (apiError) {
      console.error("Failed to create patient in MyPatientProfilePH:", apiError);
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        city,
        bloodType,
        rhFactor: rhFactor || "positive",
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        consentInfo,
        consentContact,
        consentTimestamp: new Date(),
        patientId,
        isAvailable: true,
        isVerified: false,
      },
    });

    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    await createAuditLog({
      action: "USER_REGISTER",
      entityType: "User",
      entityId: user.id,
      details: `New donor registered: ${firstName} ${lastName}`,
      ipAddress: ip,
      userId: user.id,
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      type: "user",
    });

    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
