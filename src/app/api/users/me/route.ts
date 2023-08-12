import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    // Fetching Data from DB based on User ID
    const user = await User.findById({ _id: userId }).select("-password");
    // Return the User Data
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
