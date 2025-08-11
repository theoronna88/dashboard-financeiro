"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "../api/api";

const ContaAzulPage = () => {
  const handleClick = () => {
    getApiUrl();
  };
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center flex-col gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 h-96 w-[600px]">
            <h1 className="text-2xl font-bold text-blue-800">
              Redirecionamento para Login
            </h1>

            <Button
              className="text-3xl font-bold bg-blue-500 h-12 rounded-full p-8"
              onClick={handleClick}
            >
              Conta Azul
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ContaAzulPage;
