<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GeneralStock extends Model
{


    protected $casts = [
        'plot_data' => 'json',
    ];

    protected $fillable = [
        'user_id',
        'symbol',
        'duration',
        'type',
        'plot_data',
    ];


    /**
     * Get the user that owns the stock data.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
