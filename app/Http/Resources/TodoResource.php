<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'todo_id' => $this->todo_id,
            'title'=>$this->title,
            'description'=> $this->description,
            'due_date' =>(new Carbon($this->due_date))->format('F d, Y'),
            'created_at' =>(new Carbon($this->created_at))->format('F d, Y'),
        ];
    }
}
