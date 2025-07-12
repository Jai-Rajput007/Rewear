"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface SwapItem {
  _id: string;
  title: string;
  imageUrls: string[];
}

interface SwapUser {
  _id: string;
  name: string;
}

interface Swap {
  _id: string;
  itemOffered: SwapItem;
  itemRequested: SwapItem;
  requester: SwapUser;
  owner: SwapUser;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

const SwapCard = ({ swap, type, onUpdate }: { swap: Swap; type: 'incoming' | 'outgoing'; onUpdate: () => void; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleUpdateStatus = async (status: 'accepted' | 'rejected') => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/swaps/${swap._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to update swap status');
      }

      toast.success(`Swap ${status}.`);
      onUpdate(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const myItem = type === 'incoming' ? swap.itemRequested : swap.itemOffered;
  const theirItem = type === 'incoming' ? swap.itemOffered : swap.itemRequested;
  const otherUser = type === 'incoming' ? swap.requester : swap.owner;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-center flex-1">
            <Link href={`/item/${myItem._id}`}>
              <img src={`http://localhost:8080/${myItem.imageUrls[0]}`} alt={myItem.title} className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition-opacity" />
            </Link>
            <div className="text-sm">
              <p className="font-semibold">Your Item</p>
              <p className="text-muted-foreground truncate">{myItem.title}</p>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-muted-foreground shrink-0" />

          <div className="flex items-center gap-3 text-center flex-1">
            <Link href={`/item/${theirItem._id}`}>
              <img src={`http://localhost:8080/${theirItem.imageUrls[0]}`} alt={theirItem.title} className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition-opacity" />
            </Link>
            <div className="text-sm">
              <p className="font-semibold">Their Item</p>
              <p className="text-muted-foreground truncate">{theirItem.title}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
                Requested by {otherUser.name} on {new Date(swap.createdAt).toLocaleDateString()}
            </div>
            {type === 'incoming' && swap.status === 'pending' && (
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateStatus('accepted')} disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Accept'}</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus('rejected')} disabled={isLoading}>Decline</Button>
                </div>
            )}
            {swap.status !== 'pending' && (
                <p className={`text-sm font-bold ${swap.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                    {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function MySwaps() {
  const [swaps, setSwaps] = useState<{ incoming: Swap[]; outgoing: Swap[] }>({ incoming: [], outgoing: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchSwaps = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/swaps/my-swaps', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch swaps');
      const data = await response.json();
      setSwaps(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load your swaps.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSwaps();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Or a login prompt
  }

  if (isLoading) {
    return <div>Loading swaps...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Incoming Swap Requests</h2>
        {swaps.incoming.length > 0 ? (
          <div className="space-y-4">
            {swaps.incoming.map(swap => <SwapCard key={swap._id} swap={swap} type="incoming" onUpdate={fetchSwaps} />)}
          </div>
        ) : (
          <p>No incoming swap requests at the moment.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Outgoing Swap Requests</h2>
        {swaps.outgoing.length > 0 ? (
          <div className="space-y-4">
            {swaps.outgoing.map(swap => <SwapCard key={swap._id} swap={swap} type="outgoing" onUpdate={fetchSwaps} />)}
          </div>
        ) : (
          <p>You haven't requested any swaps yet.</p>
        )}
      </div>
    </div>
  );
}
