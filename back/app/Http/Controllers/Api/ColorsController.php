<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Color\StoreRequest;
use App\Http\Requests\Api\Color\UpdateRequest;
use App\Http\Resources\ColorResource;
use App\Models\Color;

class ColorsController extends Controller
{
    public function index()
    {
        return response()->json(ColorResource::collection(
            Color::orderBy('name')->get()
        ));
    }

    public function store(StoreRequest $request)
    {
        $color = Color::create($request->all());

        return response()->json(new ColorResource($color), 201);
    }

    public function update(Color $color, UpdateRequest $request)
    {
        $color->update($request->all());

        return response()->json(new ColorResource($color));
    }

    public function destroy(Color $color)
    {
        $color->delete();

        return response()->json(null, 204);
    }
}
