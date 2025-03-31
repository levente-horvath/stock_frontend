import React, { useState } from 'react';
import { PlotData } from '@/types';

interface StockFormProps {
    onDataUpdate: (plotData: PlotData) => void;
}

export default function GeneralStockForm ({ onDataUpdate }: StockFormProps) {
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const stockSymbol = (e.target as any).stockSymbol.value;
        const duration = (e.target as any).duration.value;
        const type = (e.target as any).type.value;


        setLoading(true);
        try {
            const response = await fetch(`/stocks?symbol=${stockSymbol}&duration=${duration}&type=${type}`, {
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
            <select
                name="type"
                className="w-full rounded border p-2"
                required
            >
                <option value="volume">Volume</option>
                <option value="price">Price</option>
                <option value="adl">Accumulation/Distribution Line</option>
                <option value="vwap">Volume Weighted Average Price</option>
                <option value="ichimoku">Ichimoku Cloud</option>
                <option value="std_dev">Standard Deviation</option>
                <option value="parabolic_sar">Parabolic SAR</option>
                <option value="cci">Commodity Channel Index (CCI)</option>
                <option value="stochastic">Stochastic Oscillator</option>
                <option value="obv">On-Balance Volume (OBV)</option>
                <option value="macd">Moving Average Convergence Divergence (MACD)</option>
            </select>
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


