"use client";
import { getPessoa } from "@/app/api/api";
import { useEffect } from "react";

const PessoaPage = () => {
  useEffect(() => {
    const fetchPessoaData = async () => {
      try {
        const response = await getPessoa();
        console.log("Dados da pessoa:", response);
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
      }
    };
    fetchPessoaData();
  }, []);

  return (
    <>
      <div>
        <h1>Página Pessoa</h1>
        <p>Bem-vindo à página de pessoa!</p>
      </div>
      <div></div>
    </>
  );
};

export default PessoaPage;
