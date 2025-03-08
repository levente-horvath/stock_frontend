<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockData extends Model
{


    protected $guarded = [];

    protected $casts = [
        'Open' => 'array',
        'Close' => 'array',
        'Date' => 'array',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
