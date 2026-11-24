import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    const where: any = {};
    if (id) where.id = id;
    else if (email) where.email = email;

    let merchant = null;
    if (id || email) {
      merchant = await prisma.merchant.findFirst({ where });
    }

    if (!merchant) {
      merchant = await prisma.merchant.findFirst();
    }

    return NextResponse.json({ success: true, data: merchant });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      email,
      businessName,
      ownerName,
      phone,
      category,
      address,
      district,
      currentPassword,
      newPassword,
    } = body;

    let merchant = null;
    if (id) {
      merchant = await prisma.merchant.findUnique({ where: { id } });
    } else if (email) {
      merchant = await prisma.merchant.findUnique({ where: { email } });
    }

    if (!merchant) {
      merchant = await prisma.merchant.findFirst();
    }

    const dataToUpdate: any = {};
    if (businessName !== undefined) dataToUpdate.businessName = businessName;
    if (ownerName !== undefined) dataToUpdate.ownerName = ownerName;
    if (phone !== undefined) dataToUpdate.phone = phone;
    if (category !== undefined) dataToUpdate.category = category;
    if (address !== undefined) dataToUpdate.address = address;
    if (district !== undefined) dataToUpdate.district = district;

    // Password change validation
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" },
          { status: 400 }
        );
      }
      dataToUpdate.password = newPassword;
    }

    let updated = null;
    if (merchant && merchant.id) {
      updated = await prisma.merchant.update({
        where: { id: merchant.id },
        data: dataToUpdate,
      });
    }

    return NextResponse.json({
      success: true,
      message: newPassword
        ? "প্রোফাইল ও পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।"
        : "প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে।",
      data: updated || { ...merchant, ...dataToUpdate },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
