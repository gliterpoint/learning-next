import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user Available
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User doesn't exist", status: 400 });
    }
    // Check User's Passoword
    const validPass = await bcryptjs.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json({ message: "Password is not correct", status: 400 });
    }
    // Create Token Data
    const userTokenData = {
      id: user._id,
      username: user.username,
      email,
    };
    // Create Token
    const userToken = await jwt.sign(userTokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
    // Return Success Status
    const response = NextResponse.json({ message: "Login Successful", success: true });
    // Set Token Cookies
    response.cookies.set("Token", userToken, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "something went wrong", status: 500 });
  }
}
