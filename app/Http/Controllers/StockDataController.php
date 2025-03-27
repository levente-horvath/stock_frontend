<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class StockDataController extends Controller
{

    public function api_json_to_plotly($response){
        $client = new Client();
        
        $response = $client->get($apiUrl)->getBody()->getContents();
        $response = json_decode($string);
         
        return $response;

    }

    public function index(Request $request)
    {
        try {
            // Ensure query parameters are properly retrieved
            $stockSymbol = $request->query('symbol', 'ANET');
            $days = $request->query('days', 100);
            $window = $request->query('window', 3);

            
        
            $stockSymbol = $request->input('symbol', 'ANET');
            $days = $request->input('days', 100);
            $window = $request->input('window', 3);
            
            $apiUrl = "http://38.242.157.16:8000/plot_moving_average_plotly/{$stockSymbol}/{$days}/{$window}";
            
            $response = $this->api_json_to_plotly($apiUrl);
            

        } catch (RequestException $e) {
            // Log network-related errors
            Log::error('API request failed: ' . $e->getMessage());
            $response = [
                'data' => [],
                'layout' => ['title' => 'Error fetching data']
            ];
        } catch (\Exception $e) {
            // Log other errors (e.g., JSON decoding issues)
            Log::error('Error processing API response: ' . $e->getMessage());
            $response = [
                'data' => [],
                'layout' => ['title' => 'Error processing data']
            ];
        }

        // Pass data to Inertia React component or return JSON if requested
        if ($request->wantsJson()) {
            return response()->json(['plotData' => $plotData]);
        }
        return inertia('stock', [
            'plotData' => $response
        ]);
    }
}