<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class StockDataController extends Controller
{

    function to_plotly($apiUrl){
        $client = new Client();

        $response = $client->get($apiUrl)->getBody()->getContents();

        return json_decode(json_decode($response, true), true);
    }

    public function index(Request $request)
    {
        try {
            $client = new Client();
            // Ensure query parameters are properly retrieved
            $stockSymbol = $request->query('symbol', 'ANET');
            $days = $request->query('days', 100);
            $window = $request->query('window', 3);

            // Validate input parameters
            if (!is_string($stockSymbol) || !is_numeric($days) || !is_numeric($window)) {
                throw new \InvalidArgumentException('Invalid input parameters');
            }
        
            $stockSymbol = $request->input('symbol', 'ANET');
            $days = $request->input('days', 100);
            $window = $request->input('window', 3);
            
            $apiUrl = "http://38.242.157.16:8000/plot_moving_average_plotly/{$stockSymbol}/{$days}/{$window}";

            // Decode the JSON response into an array for Plotly
            $plotData = $this->to_plotly($apiUrl);
            
        } catch (RequestException $e) {
            // Log network-related errors
            Log::error('API request failed: ' . $e->getMessage());
            $plotData = [
                'data' => [],
                'layout' => ['title' => 'Error fetching data']
            ];
        } catch (\Exception $e) {
            // Log other errors (e.g., JSON decoding issues)
            Log::error('Error processing API response: ' . $e->getMessage());
            $plotData = [
                'data' => [],
                'layout' => ['title' => 'Error processing data']
            ];
        }

        // Pass data to Inertia React component or return JSON if requested
        if ($request->wantsJson()) {
            return response()->json(['plotData' => $plotData]);
        }
        return inertia('stock', [
            'plotData' => $plotData
        ]);
    }
}