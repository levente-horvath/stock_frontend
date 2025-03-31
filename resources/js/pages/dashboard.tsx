import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { PlotData } from '@/types';
import { Head } from '@inertiajs/react';
import StockPlot from '@/components/StockPlot';
import { usePlotData } from '@/contexts/PlotDataContext';
import { useEffect, useRef } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { plotData } = usePlotData();
    const containerRef = useRef<HTMLDivElement>(null);

    // Set height to fill available space when component mounts and on window resize
    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                // Calculate available height (viewport height minus any headers/navbars)
                const navbarHeight = 64; // Approximate height of the top navbar
                const availableHeight = window.innerHeight - navbarHeight;
                containerRef.current.style.height = `${availableHeight}px`;
            }
        };

        // Set initial height
        updateHeight();

        // Update height on window resize
        window.addEventListener('resize', updateHeight);
        
        // Clean up
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div ref={containerRef} className="w-full overflow-hidden">
                <StockPlot plotData={plotData} />
            </div>
        </AppLayout>
    );
}
