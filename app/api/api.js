"use server";
import { redirect } from "next/navigation";
import redis from "@/lib/redis";
import { cookies } from "next/headers";

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

export async function getCentroCusto() {
  const query = new URLSearchParams({
    pagina: "1",
    tamanho_pagina: "50",
  }).toString();

  const sessionId = cookies().get("sessionId")?.value;
  if (!sessionId) {
    throw new Error("Session não encontrado nos cookies.");
  }
  const accessToken = await redis.get(`session:${sessionId}`);

  if (!accessToken) {
    throw new Error("Token de acesso não encontrado no Redis.");
  }

  const response = await fetch(
    `${process.env.NEXT_API_URL}/centro-de-custo?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
}

export async function getCategorias() {
  const query = new URLSearchParams({
    pagina: "1",
    tamanho_pagina: "50",
  }).toString();

  const sessionId = cookies().get("sessionId")?.value;
  if (!sessionId) {
    throw new Error("Session não encontrado nos cookies.");
  }
  const accessToken = await redis.get(`session:${sessionId}`);

  if (!accessToken) {
    throw new Error("Token de acesso não encontrado no Redis.");
  }

  const response = await fetch(
    `${process.env.NEXT_API_URL}/categorias?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
}
