import { useState } from 'react';
import { usePlotData } from '@/contexts/PlotDataContext';
import { Save } from 'lucide-react';

export default function SavePlotButton() {
    const { plotData, savePlot } = usePlotData();
    const [title, setTitle] = useState('');
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Check if there's data to save
    const hasPlotsToSave = plotData.data.length > 0;

    const handleSaveClick = () => {
        if (!hasPlotsToSave) return;
        setShowTitleInput(true);
        setError('');
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setError('Please enter a title for your plot');
            return;
        }

        try {
            setSaving(true);
            await savePlot(title);
            setTitle('');
            setShowTitleInput(false);
            setError('');
        } catch (err) {
            setError('Failed to save plot');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setShowTitleInput(false);
        setTitle('');
        setError('');
    };

    return (
        <div className="mt-4">
            {!showTitleInput ? (
                <button
                    onClick={handleSaveClick}
                    className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                        hasPlotsToSave
                            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!hasPlotsToSave}
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Current Plot
                </button>
            ) : (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter plot title"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 