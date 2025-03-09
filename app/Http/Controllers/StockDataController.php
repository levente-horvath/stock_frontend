<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class StockDataController extends Controller
{
    public function index(Request $request)
    {
        try {
            $client = new Client();
            
            // Make parameters dynamic with defaults
            $stockSymbol = $request->input('symbol', 'ANET');
            $days = $request->input('days', 10);
            $window = $request->input('window', 3);
            
            // Construct API URL (base URL should be in config or .env)
            $apiUrl = "http://38.242.157.16:8000/plot_moving_average_plotly/{$stockSymbol}/{$days}/{$window}";
            $response = $client->get($apiUrl)->getBody()->getContents();
            
            // Decode the JSON response into an array for Plotly
            $plotData = json_decode($response, true);
            
            
            
            dd(gettype(json_decode($plotDatam, true)));


            
            // Check if decoding failed
            if (!$plotData) {
                    throw new \Exception('Invalid JSON response from API');
            }
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

        // Pass data to Inertia React component
        return inertia('stock', [
            'plotData' => $plotData
        ]);
    }
}