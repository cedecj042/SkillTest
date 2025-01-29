<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $primaryKey= 'todo_id';
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'user_id'
    ];

    public function users(){
        return $this->belongsTo(User::class,'user_id');
    }
}
