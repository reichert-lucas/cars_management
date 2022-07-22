<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarUpdateLogResource;
use App\Http\Resources\GenericCollection;
use App\Models\CarUpdateLog;

class CarUpdateLogsController extends Controller
{
    public function index()
    {
        return response()->json(
            (new GenericCollection(
                CarUpdateLog::paginate(4)
            ))->setResourceClass(CarUpdateLogResource::class)
        );
    }
}
