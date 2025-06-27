import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  const { access_token } = await req.json();

  if (!access_token) {
    return new Response("access_token ausente", { status: 400 });
  }

  const sessionId = randomUUID();

  await redis.set(`session:${sessionId}`, access_token, "EX", 3600);

  cookies().set("session_id", sessionId, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 3600,
  });

  return Response.json({ ok: true });
}
