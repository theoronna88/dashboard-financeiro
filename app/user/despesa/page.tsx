"use client";
import { getDespesas } from "@/app/api/api";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Despesa = () => {
  const [listDespesas, setListDespesas] = useState([]);

  useEffect(() => {
    if (listDespesas.length === 0) {
      const dataVencimentoAte = "2025-12-31";
      const dataVencimentoDe = "2025-01-01";
      const categorias: never[] = [];
      const centrosDeCusto: never[] = [];

      getDespesas(
        dataVencimentoDe,
        dataVencimentoAte,
        categorias,
        centrosDeCusto
      )
        .then((res) => {
          console.log("Despesas:", res);
          setListDespesas(res.itens);
        })
        .catch((error) => {
          console.error("Erro ao buscar centros de custo:", error);
        });
    }
  }, []);

  // despesa.id
  // despesa.descricao
  // despesa.total
  // despesa.dataVencimento
  // despesa.status OVERDUE, PENDING, ACQUITTED

  return (
    <>
      <div className="w-full h-full p-6">
        <DataTable columns={columns} data={listDespesas} />
      </div>
    </>
  );
};

export default Despesa;
