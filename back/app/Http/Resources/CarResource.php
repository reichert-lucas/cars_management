<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'year' => $this->year,
            'model' => $this->model,
            'price' => $this->price,
            'fuel' => $this->fuel,
            'color' => new ColorResource($this->color),
            'banner' => $this->banner
        ];
    }
}
