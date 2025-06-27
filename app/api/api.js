"use server";
import { redirect } from "next/navigation";

export async function getApiUrl() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_CLIENT_ID || "",
    redirect_uri: process.env.NEXT_REDIRECT_URI || "",
    scope: "openid profile aws.cognito.signin.user.admin",
    state: crypto.randomUUID(),
  });

  console.log(`${process.env.NEXT_AUTH_URL}?${params.toString()}`);

  return redirect(`${process.env.NEXT_AUTH_URL}?${params.toString()}`);
}

export async function getToken(authorizationCode) {
  console.log("Authorization Code:", authorizationCode);

  const basicAuth = Buffer.from(
    `${process.env.NEXT_CLIENT_ID}:${process.env.NEXT_CLIENT_SECRET}`
  ).toString("base64");

  const params = new URLSearchParams({
    client_id: process.env.NEXT_CLIENT_ID || "",
    client_secret: process.env.NEXT_CLIENT_SECRET || "",
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: process.env.NEXT_REDIRECT_URI || "",
  });

  const response = await fetch(process.env.NEXT_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const resultText = await response.text(); // usar para debugging
  console.log("Resposta bruta da API de token:", resultText);

  if (!response.ok) {
    throw new Error(
      `Token request failed: ${response.status} - ${response.statusText}`
    );
  }

  return JSON.parse(resultText);
}
