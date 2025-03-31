import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PlotData } from '@/types';
import { Head } from '@inertiajs/react';
import StockPlot from '@/components/StockPlot';
import { useState } from 'react';
import  GeneralStockForm from '@/components/general-stock-form';

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
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ width: '300px', padding: '10px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                    <GeneralStockForm onDataUpdate={setPlotData} />
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    <StockPlot plotData={plotData} />
                </div>
            </div>
        </AppLayout>
    );
}
