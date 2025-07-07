"use client";

import { ChartConfig } from "@/components/ui/chart";
import MultiBarChart from "./multibar-chart";

const chartConfig = {
  atual: {
    label: "Atual",
    color: "#2563eb",
  },
  anterior: {
    label: "Anterior",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface Categoria {
  id: number;
  nome: string;
  despesas?: [];
  despesasPrev?: [];
  total?: number;
  totalPrev?: number;
}

interface YearVsYearProps {
  centrosDeCusto: Array<{
    id: number;
    codigo: string;
    nome: string;
    categorias?: Categoria[];
  }>;
  searching: boolean;
  year: string;
}

const YearVsYear = ({ centrosDeCusto, searching, year }: YearVsYearProps) => {
  const chartDataAtual = centrosDeCusto.map((centro) => {
    // 1. Soma todos os valores "total" de dentro do array 'centro.categorias'
    const totalAtual = centro.categorias?.reduce((soma, categoria) => {
      return soma + (categoria.total ?? 0);
    }, 0); // O '0' é o valor inicial da soma

    // 2. Faz o mesmo para os valores "totalPrev"
    const totalAnterior = centro.categorias?.reduce((soma, categoria) => {
      return soma + (categoria.totalPrev ?? 0);
    }, 0);

    // 3. Retorna o objeto formatado para o gráfico
    return {
      centro: centro.nome,
      atual: totalAtual ?? 0, // Garante que seja sempre um número
      anterior: totalAnterior ?? 0, // Garante que seja sempre um número
    };
  });

  console.log(chartDataAtual);

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 @5xl/main:grid-cols-4 grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <MultiBarChart
        chartData={chartDataAtual}
        chartConfig={chartConfig}
        year={year}
        prevYear={Number(year) - 1}
        searching={searching}
      />
    </div>
  );
};

export default YearVsYear;
