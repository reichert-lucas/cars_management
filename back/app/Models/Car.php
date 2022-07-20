<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'year',
        'model',
        'price',
        'fuel',
        'color_id',
        'banner'
    ];

    static public function search(string $search = null, string $colorId = null)
    {
        $query = self::query();

        if (!is_null($search)) {
            $query->where(function ($query) use ($search) {
                return $query->where('name', 'like', "%$search%")
                        ->orWhere('year', 'like', "%$search%")
                        ->orWhere('model', 'like', "%$search%")
                        ->orWhere('fuel', 'like', "%$search%");
            });
        }

        if (!is_null($colorId)) {
            $query->where('color_id', $colorId);
        }

        return $query;
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }
}
