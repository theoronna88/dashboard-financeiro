"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ComsefazLoading from "@/components/comsefaz-loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Ainda carregando

    if (session) {
      // Se usuário está logado, redireciona para dashboard
      router.push("/user/dashboard");
    } else {
      // Se não está logado, redireciona para login
      router.push("/login");
    }
  }, [session, status, router]);

  // Mostra loading enquanto redireciona
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ComsefazLoading />
    </div>
  );
}
