import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PlotData } from '@/types';
import axios from 'axios';

// Interface for saved plots with title and ID
export interface SavedPlot {
  id: number;
  title: string;
  plotData: PlotData;
  created_at: string;
}

interface PlotDataContextType {
  plotData: PlotData;
  setPlotData: (data: PlotData) => void;
  savedPlots: SavedPlot[];
  loadingSavedPlots: boolean;
  savePlot: (title: string) => Promise<void>;
  loadPlot: (id: number) => void;
  deletePlot: (id: number) => Promise<void>;
  fetchSavedPlots: () => Promise<void>;
}

const defaultPlotData: PlotData = {
  data: [],
  layout: { title: 'Select a stock to view data' }
};

const PlotDataContext = createContext<PlotDataContextType>({
  plotData: defaultPlotData,
  setPlotData: () => {},
  savedPlots: [],
  loadingSavedPlots: false,
  savePlot: async () => {},
  loadPlot: () => {},
  deletePlot: async () => {},
  fetchSavedPlots: async () => {},
});

export const usePlotData = () => useContext(PlotDataContext);

export const PlotDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plotData, setPlotData] = useState<PlotData>(defaultPlotData);
  const [savedPlots, setSavedPlots] = useState<SavedPlot[]>([]);
  const [loadingSavedPlots, setLoadingSavedPlots] = useState(false);

  // Fetch saved plots on component mount
  useEffect(() => {
    fetchSavedPlots();
  }, []);

  // Function to fetch saved plots from the backend
  const fetchSavedPlots = async () => {
    setLoadingSavedPlots(true);
    try {
      const response = await axios.get('/api/saved-plots');
      setSavedPlots(response.data);
    } catch (error) {
      console.error('Error fetching saved plots:', error);
    } finally {
      setLoadingSavedPlots(false);
    }
  };

  // Function to save the current plot
  const savePlot = async (title: string) => {
    try {
      await axios.post('/api/saved-plots', {
        title,
        plotData,
      });
      await fetchSavedPlots(); // Refresh the list after saving
    } catch (error) {
      console.error('Error saving plot:', error);
      throw error;
    }
  };

  // Function to load a saved plot
  const loadPlot = (id: number) => {
    const plot = savedPlots.find(p => p.id === id);
    if (plot) {
      setPlotData(plot.plotData);
    }
  };

  // Function to delete a saved plot
  const deletePlot = async (id: number) => {
    try {
      await axios.delete(`/api/saved-plots/${id}`);
      await fetchSavedPlots(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting plot:', error);
      throw error;
    }
  };

  return (
    <PlotDataContext.Provider value={{ 
      plotData, 
      setPlotData, 
      savedPlots, 
      loadingSavedPlots,
      savePlot, 
      loadPlot, 
      deletePlot,
      fetchSavedPlots
    }}>
      {children}
    </PlotDataContext.Provider>
  );
}; 