import React from 'react';
import Plot from 'react-plotly.js';

interface PlotData {
    data: any[];
    layout: any;
}

interface PlotPageProps {
    plotData: PlotData;
}

const PlotPage: React.FC<PlotPageProps> = ({ plotData }) => {
    return (
        <div className="container">
            <h1>Interactive Plot (React + Inertia)</h1>
            <Plot
                data={plotData.data}
                layout={plotData.layout}
                config={{ responsive: true }}
                style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
}

export default PlotPage;
