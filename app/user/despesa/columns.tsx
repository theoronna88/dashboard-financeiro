"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Despesa = {
  id: string;
  descricao: string;
  total: number;
  data_vencimento: string;
  status: "OVERDUE" | "PENDING" | "ACQUITTED";
  categoria?: string;
  centro_custo?: string;
};

export const columns: ColumnDef<Despesa>[] = [
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  {
    accessorKey: "data_vencimento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Vencimento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const statusMap: Record<
        string,
        { label: string; color: "destructive" | "secondary" | "default" }
      > = {
        OVERDUE: { label: "Vencida", color: "destructive" },
        PENDING: { label: "Pendente", color: "secondary" },
        ACQUITTED: { label: "Pago", color: "default" },
      };
      const statusInfo = statusMap[status];
      return statusInfo ? (
        <div className="flex w-full">
          <Badge
            variant={statusInfo.color}
            className="w-6/12 items-center justify-center rounded-full"
          >
            {statusInfo.label}
          </Badge>
        </div>
      ) : (
        <Badge variant="secondary">Desconhecido</Badge>
      );
    },
  },
  {
    accessorKey: "centro_custo",
    header: "Centro de Custo",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
];
