import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }: any = reqBody;

    // Check if User exist or not
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User Already Exits" }, { status: 400 });
    }
    // Hash The password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //Created new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // Saved User to the Database
    const savedUser = await newUser.save();

    // Send Verfication Email
    await SendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return the Created User
    return NextResponse.json({ message: "User Created Successfully", success: true, savedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
