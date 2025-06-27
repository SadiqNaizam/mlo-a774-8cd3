"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange;
  onDateChange: (date: DateRange | undefined) => void;
}

const presets = [
  { label: "Today", getRange: () => ({ from: new Date(), to: new Date() }) },
  { label: "Last 7 Days", getRange: () => {
      const from = new Date();
      const to = new Date();
      from.setDate(from.getDate() - 6);
      return { from, to };
    }
  },
  { label: "Last 30 Days", getRange: () => {
      const from = new Date();
      const to = new Date();
      from.setDate(from.getDate() - 29);
      return { from, to };
    }
  },
  { label: "This Month", getRange: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from, to };
    }
  },
    { label: "Year to Date", getRange: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), 0, 1);
      return { from, to: now };
    }
  },
];


export function DateRangePicker({
  className,
  date,
  onDateChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("DateRangePicker loaded");
  }, []);

  const handlePresetSelect = (range: DateRange) => {
    onDateChange(range);
    setIsOpen(false);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="start">
          <div className="flex flex-col space-y-2 p-4 pr-2">
              <p className="text-sm font-medium">Presets</p>
              <div className="flex flex-col items-start">
                  {presets.map(({ label, getRange }) => (
                      <Button
                          key={label}
                          variant="ghost"
                          className="w-full justify-start font-normal"
                          onClick={() => handlePresetSelect(getRange())}
                      >
                          {label}
                      </Button>
                  ))}
              </div>
          </div>
          <Separator orientation="vertical" className="h-auto" />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}