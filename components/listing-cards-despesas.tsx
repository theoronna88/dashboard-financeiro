import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ListingCardsProps {
  description?: string;
  value?: string;
  title?: string;
  date?: string;
  status?: string;
  id?: string;
}

const ListingCardsDespesas = ({
  description,
  value,
  title,
  date,
  status,
  id,
}: ListingCardsProps) => {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>Title: {title}</p>
            <p>Date: {date}</p>
            <p>Status: {status}</p>
            <p>ID: {id}</p>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ListingCardsDespesas;
