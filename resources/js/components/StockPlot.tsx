import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

interface PlotData {
    data: any[];
    layout: any;
}

interface StockPlotProps {
    plotData: PlotData;
}

const StockPlot: React.FC<StockPlotProps> = ({ plotData }) => {
    useEffect(() => {
        console.log('Plot data updated:', plotData); // Debugging log
    }, [plotData]);

    return (
        <div className="w-full h-full">
            <Plot
                data={plotData.data}
                layout={plotData.layout}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default StockPlot;
