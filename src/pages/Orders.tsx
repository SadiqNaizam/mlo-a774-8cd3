import React, { useState, useEffect } from 'react';
import { File, ListFilter, Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { DateRangePicker } from '@/components/DateRangePicker';

// shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: Date;
  status: OrderStatus;
  amount: number;
}

// Placeholder data for the orders table
const allOrders: Order[] = [
  { id: 'ORD001', customer: 'Liam Johnson', email: 'liam@example.com', date: new Date(2023, 10, 23), status: 'Delivered', amount: 250.0 },
  { id: 'ORD002', customer: 'Olivia Smith', email: 'olivia@example.com', date: new Date(2023, 10, 22), status: 'Processing', amount: 150.0 },
  { id: 'ORD003', customer: 'Noah Williams', email: 'noah@example.com', date: new Date(2023, 10, 21), status: 'Cancelled', amount: 350.0 },
  { id: 'ORD004', customer: 'Emma Brown', email: 'emma@example.com', date: new Date(2023, 10, 20), status: 'Delivered', amount: 450.0 },
  { id: 'ORD005', customer: 'Ava Jones', email: 'ava@example.com', date: new Date(2023, 10, 19), status: 'Processing', amount: 550.0 },
  { id: 'ORD006', customer: 'Lucas Garcia', email: 'lucas@example.com', date: new Date(), status: 'Delivered', amount: 120.5 },
  { id: 'ORD007', customer: 'Sophia Miller', email: 'sophia@example.com', date: new Date(new Date().setDate(new Date().getDate() - 5)), status: 'Processing', amount: 89.99 },
];

const Orders = () => {
  console.log('Orders page loaded');

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(allOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<Record<OrderStatus, boolean>>({
    Delivered: true,
    Processing: true,
    Cancelled: true,
  });

  useEffect(() => {
    let orders = allOrders;

    // Filter by search term
    if (searchTerm) {
      orders = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
        orders = orders.filter((order) => {
            const orderDate = new Date(order.date);
            // set hours to 0 to compare dates only
            orderDate.setHours(0,0,0,0);
            const fromDate = new Date(dateRange.from!);
            fromDate.setHours(0,0,0,0);
            const toDate = new Date(dateRange.to!);
            toDate.setHours(0,0,0,0);

            return orderDate >= fromDate && orderDate <= toDate;
        });
    }

    // Filter by status
    const activeStatusFilters = Object.entries(statusFilter)
      .filter(([, isActive]) => isActive)
      .map(([status]) => status as OrderStatus);
      
    if (activeStatusFilters.length < 3) { // Only filter if not all are selected
      orders = orders.filter((order) => activeStatusFilters.includes(order.status));
    }


    setFilteredOrders(orders);
  }, [searchTerm, dateRange, statusFilter]);

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'default'; // default is green-ish in shadcn
      case 'Processing':
        return 'secondary'; // secondary is grey
      case 'Cancelled':
        return 'destructive'; // destructive is red
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage your orders and view their sales details.</CardDescription>
              <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
                <div className="relative w-full md:w-auto md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by ID, customer, or email..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DateRangePicker date={dateRange} onDateChange={setDateRange} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {(Object.keys(statusFilter) as OrderStatus[]).map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={statusFilter[status]}
                          onCheckedChange={(checked) =>
                            setStatusFilter((prev) => ({ ...prev, [status]: checked }))
                          }
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-10 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-muted-foreground">{order.email}</div>
                        </TableCell>
                        <TableCell>{order.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Orders;