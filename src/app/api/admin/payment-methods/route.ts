import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("activeOnly") === "true";

    const where: any = {};
    if (activeOnly) {
      where.isActive = true;
    }

    let methods = await prisma.paymentMethod.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    // Seed defaults if empty
    if (!methods || methods.length === 0) {
      const defaults = [
        {
          id: "pm_bkash",
          method: "BKASH",
          title: "বিকাশ মার্চেন্ট অ্যাকাউন্ট",
          accountType: "MERCHANT",
          accountNumber: "01700-000000",
          instructions: "Make Payment অপশন ব্যবহার করুন",
          isActive: true,
          isDefault: true,
        },
        {
          id: "pm_nagad",
          method: "NAGAD",
          title: "নগদ পার্সোনাল অ্যাকাউন্ট",
          accountType: "PERSONAL",
          accountNumber: "01800-000000",
          instructions: "Send Money অপশন ব্যবহার করুন",
          isActive: true,
          isDefault: false,
        },
        {
          id: "pm_rocket",
          method: "ROCKET",
          title: "রকেট অ্যাকাউন্ট",
          accountType: "PERSONAL",
          accountNumber: "01900-000000-8",
          instructions: "Send Money অপশন ব্যবহার করুন",
          isActive: true,
          isDefault: false,
        },
        {
          id: "pm_bank",
          method: "BANK",
          title: "ব্র্যাক ব্যাংক পিএলসি (BRAC Bank PLC)",
          accountType: "CURRENT",
          accountNumber: "1501204892019001",
          bankName: "BRAC Bank PLC",
          branchName: "Gulshan Branch, Dhaka",
          routingNumber: "060261726",
          instructions: "হিসাব নাম: Nischinto Technologies Ltd",
          isActive: true,
          isDefault: false,
        },
      ];

      for (const d of defaults) {
        try {
          await prisma.paymentMethod.create({ data: d });
        } catch (e) {}
      }

      methods = await prisma.paymentMethod.findMany({
        where,
        orderBy: { createdAt: "asc" },
      });
    }

    return NextResponse.json({ success: true, data: methods });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      method,
      title,
      accountType = "MERCHANT",
      accountNumber,
      bankName,
      branchName,
      routingNumber,
      instructions,
      isActive = true,
      isDefault = false,
    } = body;

    if (!method || !accountNumber) {
      return NextResponse.json(
        { success: false, error: "মেথড ও অ্যাকাউন্ট নম্বর আবশ্যক।" },
        { status: 400 }
      );
    }

    const created = await prisma.paymentMethod.create({
      data: {
        method,
        title: title || `${method} অ্যাকাউন্ট`,
        accountType,
        accountNumber,
        bankName,
        branchName,
        routingNumber,
        instructions: instructions || "সঠিক অ্যাকাউন্ট নম্বরে টাকা পাঠিয়ে TrxID দিন",
        isActive: Boolean(isActive),
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json({ success: true, data: created, message: "পেমেন্ট অ্যাকাউন্ট সফলভাবে যোগ করা হয়েছে!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isActive, accountNumber, title, instructions, accountType } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "আইডি প্রদান করুন।" }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (accountNumber) updateData.accountNumber = accountNumber;
    if (title) updateData.title = title;
    if (instructions) updateData.instructions = instructions;
    if (accountType) updateData.accountType = accountType;

    const updated = await prisma.paymentMethod.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated, message: "পেমেন্ট অ্যাকাউন্ট সফলভাবে আপডেট হয়েছে!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "আইডি প্রদান করুন।" }, { status: 400 });
    }

    await prisma.paymentMethod.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "পেমেন্ট অ্যাকাউন্ট মুছে ফেলা হয়েছে!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
