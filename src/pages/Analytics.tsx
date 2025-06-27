import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import StatChart from '@/components/StatChart';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { DateRange } from 'react-day-picker';

// Placeholder data for additional charts
const topProductsData = [
  { name: 'Eco-Mug', sales: 4000 },
  { name: 'Smart Watch', sales: 3000 },
  { name: 'Wireless Buds', sales: 2000 },
  { name: 'Laptop Stand', sales: 2780 },
  { name: 'Desk Mat', sales: 1890 },
];

const customerAcquisitionData = [
    { name: 'Jan', new: 40, returning: 24 },
    { name: 'Feb', new: 30, returning: 13 },
    { name: 'Mar', new: 20, returning: 98 },
    { name: 'Apr', new: 27, returning: 39 },
    { name: 'May', new: 18, returning: 48 },
    { name: 'Jun', new: 23, returning: 38 },
];


const Analytics = () => {
  console.log('Analytics page loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-8 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <div className="flex items-center space-x-2">
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            </div>
          </div>
          
          <Tabs defaultValue="sales" className="space-y-4">
            <TabsList>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="sales" className="space-y-4">
              <StatChart 
                title="Sales Performance"
                description="A detailed look at your sales metrics over the selected period."
              />
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Acquisition</CardTitle>
                        <CardDescription>New vs. returning customers over time.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={customerAcquisitionData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="new" name="New Customers" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="returning" name="Returning Customers" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Lifetime Value (LTV)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$345.67</div>
                            <p className="text-xs text-muted-foreground">+8% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.2%</div>
                             <p className="text-xs text-muted-foreground">+1.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Your best-performing products by sales revenue.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProductsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip cursor={{ fill: '#f5f5f5' }} />
                      <Legend />
                      <Bar dataKey="sales" fill="#1d4ed8" name="Sales Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;