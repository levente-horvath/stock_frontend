import React from 'react';

interface StockFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function StockForm({ onSubmit }: StockFormProps) {
    return (
        <form
            onSubmit={onSubmit}
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
    );
}


