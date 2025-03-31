<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use App\Models\GeneralStock;


class GeneralStockController extends Controller
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
            $duration = $request->query('duration', 100);
            $type = $request->query('type', 100);


            // Validate input parameters
            if (!is_string($stockSymbol) || !is_numeric($duration)) {
                throw new \InvalidArgumentException('Invalid input parameters');
            }

            $apiUrl = "https://stocks.leventehorvath.hu/plot_{$type}_plotly/{$stockSymbol}/{$duration}/";

            // Decode the JSON response into an array for Plotly
            $plotData = $this->to_plotly($apiUrl);

            if ($request->user()) {
                GeneralStock::create([
                    'user_id' => $request->user()->id,
                    'symbol' => $stockSymbol,
                    'duration' => $duration,
                    'type' => $type,
                    'plot_data' => json_encode($plotData),
                ]);
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

        // Pass data to Inertia React component or return JSON if requested
        if ($request->wantsJson()) {
            return response()->json(['plotData' => $plotData]);
        }
        return inertia('stocks', [
            'plotData' => $plotData
        ]);
    }
}
