import React, { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

interface PlotData {
    data: any[];
    layout: any;
}

interface StockPlotProps {
    plotData: PlotData;
}

const StockPlot: React.FC<StockPlotProps> = ({ plotData }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Extend the layout with responsive settings
    const enhancedLayout = {
        ...plotData.layout,
        autosize: true,
        margin: { l: 50, r: 30, t: 50, b: 50 },
    };

    return (
        <div ref={containerRef} className="w-full h-full bg-white dark:bg-gray-800">
            <Plot
                data={plotData.data}
                layout={enhancedLayout}
                config={{
                    responsive: true,
                    displayModeBar: true,
                    scrollZoom: true,
                    displaylogo: false,
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default StockPlot;
