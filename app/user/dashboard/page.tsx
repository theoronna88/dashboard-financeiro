"use client";
import { useEffect, useState } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
// import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { getCategorias, getCentroCusto, getDespesas } from "@/app/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import YearVsYear from "@/components/year-vs-year";
import { Despesa } from "../despesa/columns";
// import LoadingComsefaz from "@/components/comsefaz-loading";

export default function Page() {
  // const [inicio, setInicio] = useState<Date | null>(null);
  // const [termino, setTermino] = useState<Date | null>(null);
  // const [openInicio, setOpenInicio] = useState(false);
  // const [openTermino, setOpenTermino] = useState(false);
  interface Categoria {
    id: number;
    nome: string;
    despesas?: [];
    despesasPrev?: [];
    total?: number;
    totalPrev?: number;
  }

  interface CentroCusto {
    id: number;
    codigo: string;
    nome: string;
    categorias?: Categoria[];
  }

  const [year, setYear] = useState<string>("");
  const [centrosDeCusto, setCentrosDeCusto] = useState<CentroCusto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

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
    setSearching(true);
    let inicioStr = "";
    let terminoStr = "";
    let inicioStrPrev = "";
    let terminoStrPrev = "";
    if (year) {
      // if (inicio && termino) {
      inicioStr = `${year}-01-01`;
      terminoStr = `${year}-12-31`;
      inicioStrPrev = `${Number(year) - 1}-01-01`;
      terminoStrPrev = `${Number(year) - 1}-12-31`;
    } else {
      console.log("Selecione o ano primeiro.");
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

        const despesaCategoriaPrev = await getDespesas(
          inicioStrPrev,
          terminoStrPrev,
          [cat.id]
        )
          .then((res) => res.itens)
          .catch((error) => {
            console.error("Erro ao buscar despesas:", error);
            return [];
          });

        cat.despesas = despesaCategoria;
        cat.despesasPrev = despesaCategoriaPrev;
        // Calcula o total somando o campo 'total' de cada despesa, se existir, senão usa 'valor'
        cat.total = despesaCategoria.reduce(
          (acc: number, despesa: Despesa) =>
            acc + (typeof despesa.total === "number" ? despesa.total : 0),
          0
        );
        cat.totalPrev = despesaCategoriaPrev.reduce(
          (acc: number, despesa: Despesa) =>
            acc + (typeof despesa.total === "number" ? despesa.total : 0),
          0
        );
      }
      centrocusto.categorias = catFiltro;
    }
    setCentrosDeCusto(updatedCentros);
    setSearching(false);
    console.log("Centros de custo atualizados:", updatedCentros);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex gap-3 items-end">
            {/*
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
            />*/}
            {/* Dropdown de ano */}
            <div className="px-6">
              <Label className="block text-sm font-medium mb-1">Ano:</Label>
              <Select onValueChange={(value) => setYear(value)}>
                <SelectTrigger className="border rounded px-2 py-1">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const year = (new Date().getFullYear() - idx).toString();
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-40" variant="outline" onClick={handleOnClick}>
              <SearchIcon />
              Buscar
            </Button>
          </div>

          <YearVsYear
            centrosDeCusto={centrosDeCusto}
            searching={searching}
            year={year}
          />

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
