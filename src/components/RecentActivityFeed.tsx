import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, DollarSign } from 'lucide-react';

type ActivityType = 'new_order' | 'new_customer' | 'payment_success';

interface ActivityItem {
  id: number;
  type: ActivityType;
  description: string;
  timestamp: string;
}

const iconMap: Record<ActivityType, React.ReactNode> = {
  new_order: <ShoppingCart className="h-4 w-4 text-white" />,
  new_customer: <Users className="h-4 w-4 text-white" />,
  payment_success: <DollarSign className="h-4 w-4 text-white" />,
};

const iconBgColorMap: Record<ActivityType, string> = {
    new_order: 'bg-blue-500',
    new_customer: 'bg-green-500',
    payment_success: 'bg-purple-500',
};

// Mock data for demonstration purposes
const mockActivities: ActivityItem[] = [
  { id: 1, type: 'new_order', description: 'New order #ORD-12345 for $99.99 was placed.', timestamp: '5 minutes ago' },
  { id: 2, type: 'new_customer', description: 'A new customer, John Doe, has registered.', timestamp: '15 minutes ago' },
  { id: 3, type: 'payment_success', description: 'Payment of $45.50 for order #ORD-12344 succeeded.', timestamp: '1 hour ago' },
  { id: 4, type: 'new_order', description: 'New order #ORD-12344 for $45.50 was placed.', timestamp: '2 hours ago' },
  { id: 5, type: 'new_customer', description: 'A new customer, Jane Smith, has registered.', timestamp: 'Yesterday' },
];


const RecentActivityFeed: React.FC = () => {
    console.log('RecentActivityFeed loaded');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {mockActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${iconBgColorMap[activity.type]}`}>
                                {iconMap[activity.type]}
                            </div>
                            <div className="grid gap-1 text-sm">
                                <p className="font-medium">{activity.description}</p>
                                <p className="text-muted-foreground">{activity.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivityFeed;