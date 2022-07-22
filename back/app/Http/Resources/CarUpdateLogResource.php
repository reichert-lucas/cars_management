<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarUpdateLogResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'before_update' => $this->before,
            'after_update' => $this->after,
            'car_id' => $this->car_id,
            'user' => $this->user,
            'created_at' => $this->created_at
        ];
    }
}
