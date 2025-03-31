<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedPlot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'plot_data',
    ];

    /**
     * The attributes that should be guarded from mass assignment.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'user_id',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
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
