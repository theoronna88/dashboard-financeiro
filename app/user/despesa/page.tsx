"use client";
import { getDespesas } from "@/app/api/api";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CardsValue from "@/components/cards-value";

const Despesa = () => {
  const [listDespesas, setListDespesas] = useState([]);
  const [totais, setTotais] = useState({
    aberto: { valor: 0 },
    pago: { valor: 0 },
    pendente: { valor: 0 },
    vencido: { valor: 0 },
  });

  useEffect(() => {
    if (listDespesas.length === 0) {
      const dataVencimentoAte = "2025-12-31";
      const dataVencimentoDe = "2024-01-01";
      const categorias = ["1b2e8e14-698a-4e42-a390-ddbf6fd0b3f5"];
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
          setTotais(res.totais);
        })
        .catch((error) => {
          console.error("Erro ao buscar centros de custo:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="w-full h-full p-6">
        <div className="flex items-center justify-center w-full">
          <div className="w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {listDespesas.length > 0 && (
              <>
                <CardsValue status="Pago" value={totais.pago.valor} />
                <CardsValue status="Pendente" value={totais.pendente.valor} />
                <CardsValue status="Vencido" value={totais.vencido.valor} />
                <CardsValue
                  status="Em Aberto"
                  value={totais.aberto.valor}
                  description="Pendentes + Vencidos"
                />
              </>
            )}
          </div>
        </div>
        <DataTable columns={columns} data={listDespesas} />
      </div>
    </>
  );
};

export default Despesa;
