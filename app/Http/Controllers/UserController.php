<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Exception;
use Inertia\Inertia;
use Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        // $perPage = request('items', 5);
        $users = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Users',[
            'users'=> UserResource::collection($users)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request,int $id)
    {
        $validated = $request->validated();
        try{
            $user = User::findOrFail($id);
            $user->update([
                'firstname' => $validated['firstname'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
            ]);
            $user->save();

            return redirect()->back()->with(['success'=>'User updated successfully.']);

        }catch(Exception $e){
            Log::info("User failed to update: ". $e->getMessage());
            return redirect()->back()->withErrors(['error'=>'Failed to update user. Please try again']);
        }
    }
}
