import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PlotData } from '@/types';
import { Head } from '@inertiajs/react';
import StockPlot from '@/components/StockPlot';
import { useState } from 'react';
import StockForm from '@/components/stock-form';
import VolumeForm from '@/components/volume-form';
import PriceForm from '@/components/price-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() { 
    const [plotData, setPlotData] = useState<PlotData>({ data: [], layout: { title: 'Loading...' } });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4 flex flex-col justify-center items-center md:col-span-1" style={{ width: '300px', height: '300px' }}>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <p className="text-center text-lg font-semibold">Moving average</p>
                        
                        <StockForm onDataUpdate={setPlotData} />
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4 flex flex-col justify-center items-center md:col-span-1" style={{ width: '300px', height: '300px' }}>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <p className="text-center text-lg font-semibold">Volume data</p>
                        
                        <VolumeForm onDataUpdate={setPlotData} />
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4 flex flex-col justify-center items-center md:col-span-1" style={{ width: '300px', height: '300px' }}>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <p className="text-center text-lg font-semibold">Price data</p>
                        
                        <PriceForm onDataUpdate={setPlotData} />
                    </div>


                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="relative z-10 h-full">
                        <StockPlot plotData={plotData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
