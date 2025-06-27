import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Define the type for the icon prop to be a valid React component
type IconType = React.ElementType;

interface KpiCardProps {
  title: string;
  value: string;
  percentageChange: number;
  changeDescription: string;
  icon: IconType;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, percentageChange, changeDescription, icon: Icon }) => {
  console.log(`KpiCard loaded for: ${title}`);

  const isPositiveChange = percentageChange >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span
            className={`flex items-center mr-1 ${
              isPositiveChange ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositiveChange ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {Math.abs(percentageChange).toFixed(1)}%
          </span>
          {changeDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;