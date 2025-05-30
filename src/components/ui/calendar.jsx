import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Calendar = React.forwardRef(({ className, ...props }, ref) => (
  <DayPicker ref={ref} className={className} {...props} />
));
Calendar.displayName = "Calendar";

export { Calendar };
