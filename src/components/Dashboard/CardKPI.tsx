
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type CardKPIProps = {
  title: string;
  value: string;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export function CardKPI({ title, value, icon, change, className }: CardKPIProps) {
  return (
    <Card className={cn("shadow-soft hover:shadow-soft-lg transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-6">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary-50 text-primary flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        
        {change && (
          <p className="text-xs flex items-center mt-1">
            <span
              className={cn(
                "font-medium mr-1",
                change.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {change.isPositive ? "+" : ""}{change.value}%
            </span>
            <span className="text-gray-500">
              vs. mês anterior
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
