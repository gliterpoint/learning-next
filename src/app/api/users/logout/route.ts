import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "User logged out Scuccessfully", success: true });
    //Setting the Tokon
    response.cookies.set("Token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
