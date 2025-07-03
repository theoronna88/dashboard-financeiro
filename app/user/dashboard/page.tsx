"use client";
import { useEffect, useState } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { getCategorias, getCentroCusto, getDespesas } from "@/app/api/api";

export default function Page() {
  const [inicio, setInicio] = useState<Date | null>(null);
  const [termino, setTermino] = useState<Date | null>(null);
  const [openInicio, setOpenInicio] = useState(false);
  const [openTermino, setOpenTermino] = useState(false);
  const [centrosDeCusto, setCentrosDeCusto] = useState<>([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCentrosDeCusto = async () => {
      try {
        const res = await getCentroCusto();
        setCentrosDeCusto(res.itens);
      } catch (error) {
        console.error("Erro ao buscar centros de custo:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategorias(res.itens);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    if (!loading) {
      fetchCentrosDeCusto();
      fetchCategorias();
      setLoading(true);
    }
  }, [loading]);

  async function handleOnClick() {
    let inicioStr = "";
    let terminoStr = "";
    if (inicio && termino) {
      inicioStr = inicio.toISOString().slice(0, 10);
      terminoStr = termino.toISOString().slice(0, 10);
      console.log("Período selecionado:", inicioStr, "até", terminoStr);
      // Período selecionado: 2025-01-01 até 2025-07-02
    } else {
      console.log("Selecione ambas as datas de início e término.");
      return;
    }

    // Primeiro, atualizar as categorias de cada centro de custo
    const updatedCentros = [...centrosDeCusto];
    console.log("Categorias carregadas:", categorias);
    console.log("Centros de custo antes da atualização:", updatedCentros);
    for (const centrocusto of centrosDeCusto) {
      const catFiltro = categorias.filter((cat) =>
        cat.nome.startsWith(centrocusto.codigo + ".")
      );
      for (const cat of catFiltro) {
        const despesaCategoria = await getDespesas(inicioStr, terminoStr, [
          cat.id,
        ])
          .then((res) => res.itens)
          .catch((error) => {
            console.error("Erro ao buscar despesas:", error);
            return [];
          });

        cat.despesas = despesaCategoria;
        cat.total = despesaCategoria.reduce(
          (acc, despesa) => acc + despesa.valor,
          0
        );
      }
      centrocusto.categorias = catFiltro;
    }
    setCentrosDeCusto(updatedCentros);
    console.log("Centros de custo atualizados:", updatedCentros);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex gap-3">
            <DatePicker
              date={inicio}
              setDate={setInicio}
              open={openInicio}
              setOpen={setOpenInicio}
              label="Início do período:"
            />
            <DatePicker
              date={termino}
              setDate={setTermino}
              open={openTermino}
              setOpen={setOpenTermino}
              label="Final do período:"
            />
            <Button className="w-40" variant="outline" onClick={handleOnClick}>
              <SearchIcon />
              Buscar
            </Button>
          </div>

          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
