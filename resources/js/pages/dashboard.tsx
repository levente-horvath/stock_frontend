import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import StockPlot from '@/components/StockPlot';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() { 
    const [plotData, setPlotData] = useState({ data: [], layout: { title: 'Loading...' } });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const stockSymbol = (e.target as any).stockSymbol.value;
        const days = (e.target as any).days.value;
        const timeWindow = (e.target as any).timeWindow.value;

        try {
            // stocks?symbol=$ANET&days=$25&window=$3
            const response = await fetch(`/stocks?symbol=${stockSymbol}&days=${days}&window=${timeWindow}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Fetched data:', data);
            if (data.plotData) {
                setPlotData({ data: data.plotData.data, layout: data.plotData.layout }); // Correctly update plotData
            } else {
                console.error('Invalid API response format');
                setPlotData({
                    data: [],
                    layout: { title: 'Error fetching data' },
                });
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setPlotData({
                data: [],
                layout: { title: 'Error fetching data' },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4 flex flex-col justify-center items-center md:col-span-1" style={{ width: '300px', height: '300px' }}>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <form
                            onSubmit={handleFormSubmit}
                            className="relative z-10 flex flex-col gap-4 w-full max-w-sm"
                        >
                            <input
                                type="text"
                                name="stockSymbol"
                                placeholder="Stock Symbol"
                                className="w-full rounded border p-2"
                                required
                            />
                            <input
                                type="number"
                                name="days"
                                placeholder="Days"
                                className="w-full rounded border p-2"
                                required
                            />
                            <input
                                type="number"
                                name="timeWindow"
                                placeholder="Window"
                                className="w-full rounded border p-2"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                            >
                                Update Plot
                            </button>
                        </form>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
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
