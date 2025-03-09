<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockData extends Model
{
    // Specify fillable fields to prevent mass assignment vulnerabilities
    protected $fillable = ['Open', 'Close', 'Date', 'user_id'];

    // Cast JSON columns to arrays
    protected $casts = [
        'Open' => 'array',
        'Close' => 'array',
        'Date' => 'array',
    ];

    /**
     * Get the user that owns this stock data.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}