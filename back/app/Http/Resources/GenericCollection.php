<?php
 
namespace App\Http\Resources;
 
use Illuminate\Http\Resources\Json\ResourceCollection;
 
class GenericCollection extends ResourceCollection
{
    protected string $resourceClass;

    public function setResourceClass($resourceClass): self
    {
        $this->resourceClass = $resourceClass;
        return $this;
    }

    public function toArray($request): array
    {
        return [
            'pagination' => [
                'total' => $this->total(),
                'current_page' => $this->currentPage(),
                'current_page_total' => $this->count(),
                'per_page' => $this->perPage(),
                'last_page' => $this->lastPage(),
            ],
            'data' => $this->resourceClass::collection($this->collection),
        ];
    }
}