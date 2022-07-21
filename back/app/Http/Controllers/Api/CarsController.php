<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Car\StoreRequest;
use App\Http\Requests\Api\Car\UpdateRequest;
use App\Http\Resources\CarResource;
use App\Http\Resources\GenericCollection;
use App\Models\Car;
use Illuminate\Support\Facades\Storage;

class CarsController extends Controller
{
    public function index()
    {
        return response()->json(
            (new GenericCollection(
                Car::orderBy('created_at', 'desc')->paginate(8)
            ))->setResourceClass(CarResource::class)
        );
    }

    public function store(StoreRequest $request)
    {
        $car = Car::create($request->except('banner'));
        $path = $request->banner->store("img/cars/{$car->id}", 'public');

        $car->banner = $path;
        $car->save();

        return response()->json(new CarResource($car), 201);
    }

    public function update(Car $car, UpdateRequest $request)
    {
        $car->update($request->except('banner'));

        if (!is_null($car->banner)) { 
            Storage::disk('public')->delete($car->banner); 
        }

        $path = $request->banner->store("img/cars/{$car->id}", 'public');

        $car->banner = $path;
        $car->save();

        return response()->json(new CarResource($car));
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(null, 204);
    }
}
