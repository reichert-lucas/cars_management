<?php

namespace App\Http\Requests\Api\Car;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|min:3|max:255',
            'year' => 'nullable|integer|min:1000|max:9999',
            'model' => 'nullable|string|min:3|max:255',
            'price' => 'nullable|numeric|min:1',
            'fuel' => 'nullable|string|min:3|max:255',
            'color_id' => 'nullable|integer|exists:colors,id',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048'
        ];
    }
}
