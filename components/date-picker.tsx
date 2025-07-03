import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

type DatePickerProps = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
};

const DatePicker = ({
  date,
  setDate,
  open,
  setOpen,
  label,
}: DatePickerProps) => {
  return (
    <div className="px-6">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Selecione uma data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date ?? null);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
