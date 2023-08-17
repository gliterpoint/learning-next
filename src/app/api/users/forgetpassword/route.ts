import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { SendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: "Email doesn't Exist" }, { status: 400 });
    }

    SendEmail({ email, emailType: "RESET", userId: user._id });

    console.log(email);
    return NextResponse.json({ message: "Email Sent Successfull" }, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
