import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ListingCardsProps {
  description?: string;
  value?: string;
}

const ListingCards = ({ description, value }: ListingCardsProps) => {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ListingCards;
