import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextResponse) {
  try {
    //Getting Token
    const reqBody = await request.json();
    const { token } = reqBody;
    // Checking User in DB based on Token
    const user = await User.findOne({ verifyToken: token, VerifyTokenExpiry: { $gt: Date.now() } });
    // Checking User Exist or not
    if (!user) {
      return NextResponse.json({ error: "Invlid Token" }, { status: 400 });
    }
    console.log(user);
    // Updating User values
    user.isVerfied = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    // Save back to Database
    await user.save();

    return NextResponse.json({ message: "Email Verfied Successfully", success: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
