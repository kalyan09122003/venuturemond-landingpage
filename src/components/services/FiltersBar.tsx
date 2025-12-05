import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/lib/mockServicesApi';
import { cn } from '@/lib/utils';

interface FiltersBarProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (id: string | null) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    className?: string;
}

export function FiltersBar({
    categories,
    selectedCategory,
    onSelectCategory,
    searchQuery,
    onSearchChange,
    className
}: FiltersBarProps) {
    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search services, features..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
                        <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                    {/* Mobile category scroll could go here or just use the badges below */}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                    onClick={() => onSelectCategory(null)}
                >
                    All
                </Badge>
                {categories.map(cat => (
                    <Badge
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                        onClick={() => onSelectCategory(cat.id)}
                    >
                        {cat.title}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
