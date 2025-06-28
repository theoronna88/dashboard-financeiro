import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListingCardsProps {
  description?: string;
  value?: number | string;
  title?: string;
  date?: string;
  status?: string;
  id?: string;
}

const CardsValue = ({
  description,
  value,
  title,
  status,
}: ListingCardsProps) => {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>
          {description}
          {title}
        </CardDescription>
        <div className="flex justify-between">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value
              ? value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ 0,00"}
          </CardTitle>

          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                status === "Pago"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : status === "Pendente"
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : status === "Vencido"
                  ? "bg-red-100 text-red-800 border-red-300"
                  : status === "Em Aberto"
                  ? "bg-red-100 text-red-800 border-red-300"
                  : ""
              }`}
            >
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CardsValue;
