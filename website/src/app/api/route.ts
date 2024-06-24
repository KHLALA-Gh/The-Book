import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  return NextResponse.redirect(path.join(url.origin, "/api.html"));
}
