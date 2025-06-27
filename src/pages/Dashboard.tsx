import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import KpiCard from '@/components/KpiCard';
import StatChart from '@/components/StatChart';
import RecentActivityFeed from '@/components/RecentActivityFeed';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const recentOrders = [
  {
    customer: 'Liam Johnson',
    email: 'liam@example.com',
    amount: '$250.00',
    status: 'Paid',
    date: '2023-06-23',
  },
  {
    customer: 'Olivia Smith',
    email: 'olivia@example.com',
    amount: '$150.00',
    status: 'Pending',
    date: '2023-06-24',
  },
  {
    customer: 'Noah Williams',
    email: 'noah@example.com',
    amount: '$350.00',
    status: 'Paid',
    date: '2023-06-25',
  },
  {
    customer: 'Emma Brown',
    email: 'emma@example.com',
    amount: '$450.00',
    status: 'Cancelled',
    date: '2023-06-26',
  },
];

const Dashboard = () => {
  console.log('Dashboard page loaded');

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* KPI Cards */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <KpiCard
              title="Total Revenue"
              value="$45,231.89"
              percentageChange={20.1}
              changeDescription="from last month"
              icon={DollarSign}
            />
            <KpiCard
              title="New Customers"
              value="+1,250"
              percentageChange={15.2}
              changeDescription="from last month"
              icon={Users}
            />
            <KpiCard
              title="Sales"
              value="+12,234"
              percentageChange={-5.4}
              changeDescription="from last week"
              icon={CreditCard}
            />
            <KpiCard
              title="Average Order Value"
              value="$124.50"
              percentageChange={3.1}
              changeDescription="from yesterday"
              icon={Activity}
            />
          </section>

          {/* Main Chart and Activity Feed */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
            <div className="lg:col-span-4">
               <StatChart
                title="Store Performance"
                description="An overview of your store's sales performance."
              />
            </div>
            <div className="lg:col-span-3">
              <RecentActivityFeed />
            </div>
          </section>

          {/* Recent Orders Table */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of the most recent orders from your store.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{order.customer}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{order.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;