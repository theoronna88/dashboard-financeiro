import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + 1 - i);

// TODO: Ajustar os campos do orçamento, finaliar validação e integração

const budgetFields = [
  "contribuicao",
  "contribuicao_2023",
  "contribuicao_2024",
  "convenios",
  "outras_receitas",
  "resgate_fundo_investimento",
  "planos_acoes",
  "projetos_institucionais",
  "legislativos",
  "levantamentos_economicos",
] as const;

/*
function zodResolver(
  formSchema: z.ZodObject<
    {
      ano: z.ZodString;
      contribuicao: z.ZodNumber;
      contribuicao_2023: z.ZodNumber;
      contribuicao_2024: z.ZodNumber;
      convenios: z.ZodNumber;
      outras_receitas: z.ZodNumber;
      resgate_fundo_investimento: z.ZodNumber;
      planos_acoes: z.ZodNumber;
      projetos_institucionais: z.ZodNumber;
      legislativos: z.ZodNumber;
      levantamentos_economicos: z.ZodNumber;
    },
    "strip",
    z.ZodTypeAny,
    {
      contribuicao: number;
      contribuicao_2023: number;
      contribuicao_2024: number;
      convenios: number;
      outras_receitas: number;
      resgate_fundo_investimento: number;
      planos_acoes: number;
      projetos_institucionais: number;
      legislativos: number;
      levantamentos_economicos: number;
      ano: string;
    },
    {
      contribuicao: number;
      contribuicao_2023: number;
      contribuicao_2024: number;
      convenios: number;
      outras_receitas: number;
      resgate_fundo_investimento: number;
      planos_acoes: number;
      projetos_institucionais: number;
      legislativos: number;
      levantamentos_economicos: number;
      ano: string;
    }
  >
):
  | import("react-hook-form").Resolver<
      {
        ano: string;
        contribuicao: number;
        contribuicao_2023: number;
        contribuicao_2024: number;
        convenios: number;
        outras_receitas: number;
        resgate_fundo_investimento: number;
        planos_acoes: number;
        projetos_institucionais: number;
        legislativos: number;
        levantamentos_economicos: number;
      },
      any,
      {
        ano: string;
        contribuicao: number;
        contribuicao_2023: number;
        contribuicao_2024: number;
        convenios: number;
        outras_receitas: number;
        resgate_fundo_investimento: number;
        planos_acoes: number;
        projetos_institucionais: number;
        legislativos: number;
        levantamentos_economicos: number;
      }
    >
  | undefined {
  throw new Error("Function not implemented.");
}
  */

const formSchema = z.object({
  ano: z.string().min(4),
  contribuicao: z.coerce.number().nonnegative(),
  contribuicao_2023: z.coerce.number(),
  contribuicao_2024: z.coerce.number(),
  convenios: z.coerce.number(),
  outras_receitas: z.coerce.number(),
  resgate_fundo_investimento: z.coerce.number().nonnegative(),
  planos_acoes: z.coerce.number().nonnegative(),
  projetos_institucionais: z.coerce.number(),
  legislativos: z.coerce.number(),
  levantamentos_economicos: z.coerce.number(),
});

export default function BudgetForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ano: String(currentYear),
      contribuicao: 0,
      contribuicao_2023: 0,
      contribuicao_2024: 0,
      convenios: 0,
      outras_receitas: 0,
      resgate_fundo_investimento: 0,
      planos_acoes: 0,
      projetos_institucionais: 0,
      legislativos: 0,
      levantamentos_economicos: 0,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form values:", data);
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {budgetFields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.replace(/_/g, " ").toUpperCase()}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Salvar
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
