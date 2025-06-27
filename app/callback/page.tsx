"use client";
import { getToken } from "@/app/api/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SpinnerLoading from "@/components/loading";

const Callback = () => {
  const searchParams = useSearchParams();
  const alreadyCalled = useRef(false);
  const router = useRouter();

  async function handleCallback() {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      const token = await getToken(code);

      const sessionId = crypto.randomUUID();

      await fetch("/api/store-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: token.access_token, sessionId }),
      });
      document.cookie = `sessionId=${sessionId}; path=/`;

      router.push("/user/dashboard");
    } else {
      console.error("Código ou estado ausente na URL.");
    }
  }

  useEffect(() => {
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;
    handleCallback();
  }, []);

  return (
    <>
      <SpinnerLoading />
    </>
  );
};

export default Callback;
