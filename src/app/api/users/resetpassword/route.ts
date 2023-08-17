import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    console.log(token);
    console.log(password);

    const user = await User.findOne({ forgetPasswordToken: token, forgetPasswordTokenExpiry: { $gt: Date.now() } });

    if (!user) {
      return NextResponse.json({ error: "Invlid Token" }, { status: 400 });
    }
    console.log(user);

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user.password = hashPassword;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;

    user.save();

    console.log("password updated and save");

    return NextResponse.json({ message: "Updated Password Successfully" }, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
