"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function AddItemPage() {
  const { user, getToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        toast({ title: "Error", description: "You can only upload a maximum of 5 images.", variant: "destructive" });
        return;
      }
      setImages(prevImages => [...prevImages, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to list an item.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', type);
    formData.append('size', size);
    formData.append('condition', condition);
    formData.append('tags', tags);
    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to list item');
      }

      const result = await response.json();
      toast({ title: "Success!", description: "Your item has been listed successfully." });
      router.push(`/item/${result.item._id}`);

    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "An unknown error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">List a New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Vintage Denim Jacket" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your item in detail..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label>Category</label>
                  <Select onValueChange={setCategory} required>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tops">Tops</SelectItem>
                      <SelectItem value="Bottoms">Bottoms</SelectItem>
                      <SelectItem value="Dresses">Dresses</SelectItem>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Type</label>
                  <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g., T-Shirt, Jeans" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label>Size</label>
                  <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g., M, 10, 42" required />
                </div>
                <div className="space-y-2">
                  <label>Condition</label>
                  <Select onValueChange={setCondition} required>
                    <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New with tags">New with tags</SelectItem>
                      <SelectItem value="Like new">Like new</SelectItem>
                      <SelectItem value="Gently used">Gently used</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="tags">Tags</label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., retro, 90s, streetwear (comma-separated)" />
              </div>

              <div className="space-y-2">
                <label>Images (up to 5)</label>
                <Input type="file" multiple onChange={handleImageChange} accept="image/*" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image src={preview} alt={`Preview ${index}`} fill className="rounded-md object-cover" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Listing...' : 'List My Item'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
