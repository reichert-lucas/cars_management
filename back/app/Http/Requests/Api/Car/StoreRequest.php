<?php

namespace App\Http\Requests\Api\Car;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'year' => 'required|integer|min:1000|max:9999',
            'model' => 'required|string|min:3|max:255',
            'price' => 'required|numeric|min:1',
            'fuel' => 'required|string|min:3|max:255',
            'color_id' => 'required|integer|exists:colors,id',
            'banner' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048'
        ];
    }
}
