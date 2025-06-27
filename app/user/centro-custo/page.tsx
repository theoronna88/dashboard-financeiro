"use client";
import { getCentroCusto } from "@/app/api/api";
import ListingCards from "@/components/listing-cards";
import { useEffect, useState } from "react";

type CentroCusto = {
  id: string;
  nome: string;
  codigo: string;
};

const CentrodeCusto = () => {
  const [listCentroCusto, setListCentroCusto] = useState<CentroCusto[]>([]);

  useEffect(() => {
    if (listCentroCusto.length === 0) {
      getCentroCusto()
        .then((res) => {
          setListCentroCusto(res.itens);
        })
        .catch((error) => {
          console.error("Erro ao buscar centros de custo:", error);
        });
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 md:gap-8 md:p-8">
          {listCentroCusto.map((item) => (
            <ListingCards
              value={item.nome}
              description={`Item: ${item.codigo}`}
              key={item.codigo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentrodeCusto;
