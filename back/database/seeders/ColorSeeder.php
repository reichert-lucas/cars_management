<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colors = [
            ['name'=>'branco'],
            ['name'=>'preto'],
            ['name'=>'vermelho'],
            ['name'=>'roxo'],
            ['name'=>'rosa'],
            ['name'=>'cinza'],
            ['name'=>'marrom'],
        ];
        
        Color::insert($colors);
    }
}
