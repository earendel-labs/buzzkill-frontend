// src/app/api/user-info/route.ts
import { NextResponse } from "next/server";
import { UserInfo } from "@/types/UserInfo";

const defaultUserInfo: UserInfo = {
  pollen: 75000,
  nectar: 235000,
  sap: 75000,
  honey: 953000,
  queenBees: 5,
  workerBees: 50,
};

export async function GET() {
  return NextResponse.json(defaultUserInfo);
}
