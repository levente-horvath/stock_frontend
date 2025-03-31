<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedPlot;
use Illuminate\Support\Facades\Auth;

class SavedPlotController extends Controller
{
    /**
     * Get all saved plots for the authenticated user
     */
    public function index()
    {
        $plots = SavedPlot::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($plots);
    }

    /**
     * Save a new plot
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'plotData' => 'required',
        ]);

        $plot = new SavedPlot();
        $plot->user_id = Auth::id();
        $plot->title = $request->title;
        $plot->plotData = $request->plotData;
        $plot->save();

        return response()->json($plot, 201);
    }

    /**
     * Get a specific saved plot
     */
    public function show($id)
    {
        $plot = SavedPlot::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return response()->json($plot);
    }

    /**
     * Delete a saved plot
     */
    public function destroy($id)
    {
        $plot = SavedPlot::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $plot->delete();

        return response()->json(null, 204);
    }
}
