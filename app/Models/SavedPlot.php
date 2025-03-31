<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedPlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'plot_data',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['plotData'];

    /**
     * Get the plot data as a decoded JSON object.
     */
    public function getPlotDataAttribute()
    {
        return json_decode($this->attributes['plot_data'] ?? '{}');
    }

    /**
     * Set the plot data.
     */
    public function setPlotDataAttribute($value)
    {
        $this->attributes['plot_data'] = is_string($value) ? $value : json_encode($value);
    }

    /**
     * Get the user that owns the saved plot.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
