<?php

namespace App\Http\Requests;

use App\Models\Todo;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if the authenticated user is the owner of the todo
        $todoId = $this->route('id'); // Fetch 'id' from the route
        $todo = Todo::find($todoId); // Fetch the Todo instance from the database

        // Ensure the todo exists and the authenticated user is the owner
        return $todo !== null && (int) $todo->user_id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'due_date' => 'required|date|after_or_equal:today',
        ];
    }


    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.string' => 'The title must be a valid string.',
            'title.max' => 'The title may not be greater than 255 characters.',

            'description.string' => 'The description must be a valid string.',
            'description.max' => 'The description may not be greater than 500 characters.',

            'due_date.required' => 'The due date field is required.',
            'due_date.date' => 'The due date must be a valid date.',
            'due_date.after_or_equal' => 'The due date must be today or a future date.',
        ];
    }
}
