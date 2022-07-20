<?php

namespace App\Http\Requests\Api\Color;

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
            'name' => "required|string|min:3|max:255|unique:colors,name,{$this->color->id}"
        ];
    }
}
