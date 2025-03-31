import { LineChart } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <header className="container mx-auto py-6 px-4 flex justify-between items-center">
                <Link href={route('home')} className="flex items-center space-x-2">
                    <LineChart className="h-8 w-8 text-blue-400" />
                    <span className="text-2xl font-bold">StockAnalyzer</span>
                </Link>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto flex justify-center py-12 px-4">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl">
                    <div className="flex flex-col items-center gap-4 text-center mb-8">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-gray-300 text-sm">{description}</p>
                    </div>
                    {children}
                </div>
            </main>

       
        </div>
    );
}
