import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';

// Placeholder customer data
const customersData = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    joinDate: '2023-01-15',
    lifetimeValue: 1250.75,
    avatarUrl: 'https://ui.shadcn.com/avatars/02.png',
    avatarFallback: 'AJ',
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    joinDate: '2023-02-20',
    lifetimeValue: 850.0,
    avatarUrl: 'https://ui.shadcn.com/avatars/03.png',
    avatarFallback: 'BW',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    joinDate: '2023-03-10',
    lifetimeValue: 2300.5,
    avatarUrl: 'https://ui.shadcn.com/avatars/04.png',
    avatarFallback: 'CB',
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    joinDate: '2023-04-05',
    lifetimeValue: 450.25,
    avatarUrl: 'https://ui.shadcn.com/avatars/05.png',
    avatarFallback: 'DP',
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    joinDate: '2023-05-21',
    lifetimeValue: 3100.0,
    avatarUrl: 'https://github.com/shadcn.png',
    avatarFallback: 'EH',
  },
];

const Customers = () => {
  console.log('Customers page loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customersData;
    }
    return customersData.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        <Header />
        <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customers</CardTitle>
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name or email..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Lifetime Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                              <AvatarFallback>{customer.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(customer.lifetimeValue)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No customers found.
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

export default Customers;