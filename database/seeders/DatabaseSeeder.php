<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create()->each(function ($user) {
            Todo::factory(15)->create([
                'user_id' => $user->user_id,
            ]);
        });

        $user1 = User::factory()->create([
            'firstname' => 'Jacob',
            'lastname' => 'Adams',
            'email' => 'usjr@email.com',
            'password' => Hash::make('usjr1234'),
        ]);
        Todo::factory(15)->create([
            'user_id' => $user1->user_id,
        ]);

        $user2 = User::factory()->create([
            'firstname' => 'sample',
            'lastname' => 'user',
            'email' => 'test@email.com',
            'password' => Hash::make('usjr1234'),
        ]);
        Todo::factory(15)->create([
            'user_id' => $user2->user_id,
        ]);
    }
}
