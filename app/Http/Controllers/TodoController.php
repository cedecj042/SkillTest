<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Log;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // Fetch todos for the authenticated user and paginate the results
        $todos = Todo::where('user_id', $user->user_id)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia::render('Todos', [
            'title' => 'Todos',
            'todos' => TodoResource::collection($todos),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        //
        $validated = $request->validated();
        $user_id = Auth::id();
        Log::info('Validated Data:', $validated);
        try {
            $todo = Todo::create([

                'title' => $validated['title'],
                'description' => $validated['description'],
                'due_date' => $validated['due_date'],
                'user_id'=> $user_id,
            ]);
            $todo->save();
            return redirect()->back()->with(['success' => 'Todo created succesfully.']);
        } catch (Exception $e) {
            Log::info('Unexpected error: ' . $e);
            return redirect()->back()->withErrors(['error' => 'Unable to save the todo']);
        }
    }
    public function show(int $id)
    {
        Log::info($id);
        try {
            $todo = Todo::findOrFail($id);
            return Inertia::render('TodoDetail', [
                'title' => 'Todos',
                'todo' => new TodoResource($todo)
            ]);
        } catch (Exception $e) {
            Log::info('Unexpected error: ' . $e);
            return redirect()->back()->withErrors(['error' => 'Unable to save the todo']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, int $id)
    {
        $validated = $request->validated();
        try {
            $todo = Todo::findOrFail($id);
            $todo->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'due_date' => $validated['due_date']
            ]);

            return redirect()->back()->with(['success' => 'Todo updated successfully.']);

        } catch (Exception $e) {
            Log::info("todo failed to update: " . $e);
            return redirect()->back()->withErrors(['error' => 'Failed to update todo. Please try again']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        try {
            $todo = Todo::findOrFail($id);
            $todo->delete();

            return redirect()->back()->with(['success' => 'Todo deleted successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to delete todo: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to delete todo. Please try again.']);
        }
    }
}
