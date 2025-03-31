import { Head, Link, usePage } from '@inertiajs/react';
import { LineChart, BarChart, TrendingUp } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Stock Analysis Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
                {/* Header */}
                <header className="container mx-auto py-6 px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <LineChart className="h-8 w-8 text-blue-400" />
                        <span className="text-2xl font-bold">Stock Visualizer</span>
                    </div>
                    <nav className="flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto py-20 px-4 text-center">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-6">Stock Visualization Platform</h1>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-8 py-3 text-lg rounded-md bg-blue-600 hover:bg-blue-700 transition-colors inline-block"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="px-8 py-3 text-lg rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Get Started
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-8 py-3 text-lg rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                            >
                                Log In
                            </Link>
                        </div>
                    )}
                </section>

                {/* Features Section */}
                <section className="container mx-auto py-20 px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Powerful Stock Analysis Tools</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                            <div className="mb-4"><BarChart className="h-10 w-10 text-blue-400" /></div>
                            <h3 className="text-xl font-semibold mb-3">Volume Analysis</h3>
                            <p className="text-gray-300">Track trading volume patterns to identify market momentum and potential trend reversals.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                            <div className="mb-4"><LineChart className="h-10 w-10 text-blue-400" /></div>
                            <h3 className="text-xl font-semibold mb-3">Price Charting</h3>
                            <p className="text-gray-300">Visualize price movements with customizable chart types and timeframes.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                            <div className="mb-4"><TrendingUp className="h-10 w-10 text-blue-400" /></div>
                            <h3 className="text-xl font-semibold mb-3">Trend Analysis</h3>
                            <p className="text-gray-300">Identify market trends and potential entry/exit points with advanced pattern recognition.</p>
                        </div>
                </div>
                </section>

               
               
            </div>
        </>
    );
}
