'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Package, Clock, CheckCircle2, Trash2, Edit3 } from 'lucide-react';

type ResourceState = 'Available' | 'Reserved' | 'Borrowed' | 'Sold' | 'Returned' | 'Expired' | 'Unavailable';

interface Resource {
  id: string;
  name: string;
  category: string;
  state: ResourceState;
  method: string;
  price: string;
}

const MOCK_RESOURCES: Resource[] = [
  { id: '1', name: 'TI-84 Plus CE', category: 'Electronics', state: 'Available', method: 'Rent', price: '$5/day' },
  { id: '2', name: 'Organic Chem Book', category: 'Books', state: 'Borrowed', method: 'Borrow', price: 'Free' },
  { id: '3', name: 'Digital Multimeter', category: 'Tools', state: 'Reserved', method: 'Rent', price: '$2/day' },
  { id: '4', name: 'DSLR Camera', category: 'Photography', state: 'Sold', method: 'Sell', price: '$400' },
];

export default function ManageResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">My Resources</h1>
          <p className="text-gray-500">Manage your listings and active exchanges.</p>
        </div>
        <Button>Add New Resource</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESOURCES.map((res, i) => (
          <div key={res.id} style={{ opacity: 0, animationDelay: `${0.1 + i * 0.1}s` }} className="animate-fade-in-up">
            <Card className="p-6 hover:border-gray-300 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <Badge variant={res.state === 'Available' ? 'green' : 'gray'}>
                  {res.state}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-1">{res.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{res.category} • {res.method}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium">{res.price}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
