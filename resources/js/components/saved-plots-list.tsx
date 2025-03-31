import { usePlotData } from '@/contexts/PlotDataContext';
import { BarChart3, Trash2, LoaderCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SavedPlotsList() {
    const { savedPlots, loadingSavedPlots, loadPlot, deletePlot, fetchSavedPlots } = usePlotData();
    const [expandedList, setExpandedList] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch plots when component mounts and when expandedList becomes true
    useEffect(() => {
        if (expandedList) {
            handleRefresh();
        }
    }, [expandedList]);

    const toggleExpand = () => {
        setExpandedList(!expandedList);
    };

    const handleLoadPlot = (id: number) => {
        loadPlot(id);
    };

    const handleDeletePlot = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setDeletingId(id);
            await deletePlot(id);
        } catch (error) {
            console.error('Error deleting plot:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchSavedPlots();
        } catch (error) {
            console.error('Error refreshing plots:', error);
        } finally {
            setRefreshing(false);
        }
    };

    if (loadingSavedPlots) {
        return (
            <div className="mt-6 py-4 flex justify-center">
                <LoaderCircle className="animate-spin h-5 w-5 text-gray-500" />
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Saved Plots ({savedPlots.length})
                </h3>
                <div className="flex items-center space-x-2">
                    {expandedList && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRefresh();
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none"
                            disabled={refreshing || loadingSavedPlots}
                        >
                            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    )}
                    <button 
                        onClick={toggleExpand} 
                        className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                        {expandedList ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>

            {expandedList && savedPlots.length === 0 && !loadingSavedPlots && (
                <div className="py-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">No saved plots yet</p>
                </div>
            )}

            {expandedList && savedPlots.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {savedPlots.map((plot) => (
                        <div 
                            key={plot.id}
                            onClick={() => handleLoadPlot(plot.id)}
                            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                            <div className="flex items-center">
                                <BarChart3 className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                <div>
                                    <p className="text-sm font-medium">{plot.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(plot.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => handleDeletePlot(plot.id, e)}
                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                disabled={deletingId === plot.id}
                            >
                                {deletingId === plot.id ? (
                                    <LoaderCircle className="animate-spin h-4 w-4" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 