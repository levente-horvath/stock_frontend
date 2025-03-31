<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedPlot;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SavedPlotController extends Controller
{
    /**
     * Emergency fix for plots ownership (one-time use)
     */
    public function fixOwnership()
    {
        // Only allow this in local environment
        if (!app()->environment('local')) {
            return response()->json(['message' => 'This action is only allowed in local environment'], 403);
        }

        // Count plots per user before deletion
        $usersWithPlots = DB::table('saved_plots')
            ->select('user_id', DB::raw('count(*) as total'))
            ->groupBy('user_id')
            ->get();

        $result = [
            'before' => $usersWithPlots,
            'message' => 'Ownership fixed by clearing all plots',
        ];

        // Delete all plots (emergency action)
        DB::table('saved_plots')->delete();

        return response()->json($result);
    }

    /**
     * Test method to verify authentication
     */
    public function test(Request $request)
    {
        $user = Auth::user();
        $userId = Auth::id();
        $isGuest = Auth::guest();
        
        return response()->json([
            'message' => 'Authentication test',
            'authenticated' => !$isGuest,
            'user_id' => $userId,
            'user_email' => $user ? $user->email : null,
            'session_id' => session()->getId(),
            'request_headers' => $request->headers->all(),
        ]);
    }

    /**
     * Get all saved plots for the authenticated user
     */
    public function index()
    {
        $userId = Auth::id();
        Log::info('Fetching plots for user ID: ' . $userId);
        
        // Debug: Check if there are any plots with different user IDs
        $allUserIds = SavedPlot::distinct()->pluck('user_id')->toArray();
        Log::info('All user IDs with plots: ' . implode(', ', $allUserIds));
        
        // Debug: Log the query being executed
        DB::enableQueryLog();
        $plots = SavedPlot::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        $queries = DB::getQueryLog();
        Log::info('Query executed: ' . json_encode(end($queries)));
        
        // Debug: Log the returned plots
        Log::info('Returning ' . count($plots) . ' plots for user ' . $userId);
        foreach ($plots as $index => $plot) {
            Log::info("Plot {$index}: ID={$plot->id}, User ID={$plot->user_id}, Title={$plot->title}");
        }

        return response()->json($plots);
    }

    /**
     * Save a new plot
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        Log::info('Saving plot for user ID: ' . $userId);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'plotData' => 'required',
        ]);

        $plot = new SavedPlot();
        $plot->user_id = $userId;
        $plot->title = $request->title;
        $plot->plotData = $request->plotData;
        $plot->save();
        
        // Debug: Verify the saved plot
        Log::info("Plot saved: ID={$plot->id}, User ID={$plot->user_id}, Title={$plot->title}");

        return response()->json($plot, 201);
    }

    /**
     * Get a specific saved plot
     */
    public function show($id)
    {
        $userId = Auth::id();
        Log::info('Showing plot ' . $id . ' for user ID: ' . $userId);
        
        $plot = SavedPlot::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();

        return response()->json($plot);
    }

    /**
     * Delete a saved plot
     */
    public function destroy($id)
    {
        $userId = Auth::id();
        Log::info('Deleting plot ' . $id . ' for user ID: ' . $userId);
        
        $plot = SavedPlot::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();

        $plot->delete();

        return response()->json(null, 204);
    }
}
