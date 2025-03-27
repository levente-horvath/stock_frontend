import React, { useState } from 'react';
import { PlotData } from '@/types';

interface StockFormProps {
    onDataUpdate: (plotData: PlotData) => void;
}

export default function StockForm({ onDataUpdate }: StockFormProps) {
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const stockSymbol = (e.target as any).stockSymbol.value;
        const duration = (e.target as any).duration.value;

        setLoading(true);
        try {
            const response = await fetch(`/volume?symbol=${stockSymbol}&duration=${duration}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();
            if (data.plotData) {
                onDataUpdate({ data: data.plotData.data, layout: data.plotData.layout });
            } else {
                console.error('Invalid API response format');
                onDataUpdate({
                    data: [],
                    layout: { title: 'Error fetching data' },
                });
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            onDataUpdate({
                data: [],
                layout: { title: 'Error fetching data' },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
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
                name="duration"
                placeholder="Duration (days)"
                className="w-full rounded border p-2"
                required
            />
            
            <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Update Plot'}
            </button>
        </form>
    );
}


