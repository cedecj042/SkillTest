<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Log;

class AuthController extends Controller
{
    public function showLogin(){
        return Inertia::render('Auth/Login');
    }
    public function login(LoginRequest $request ){
        
        $validated = $request->validated();
        
        try{
            if(Auth::attempt(['email'=>$validated['email'],'password'=>$validated['password']])){
                $user = Auth::user();
                $request->session()->regenerate();
                Log::info('User Successfully logged in: '. $validated['email']);
                
                return redirect()->route('api.index')->with(['message' => 'Login Successfully!']);
            }
            Log::info('The provided credentials do not match our records.');
            return redirect()->back()->withErrors( ['error'=>'The provided credentials do not match our records.']);
            
        }catch(Exception $e){
            Log::info(`Unexpected error:{$e}`);
            return redirect()->back()->withErrors(['error'=>"Unexpected error:".$e->getMessage()]);
        }
    }
    public function showSignup(){
        return Inertia::render('Auth/Signup');
    }
    public function signup(SignupRequest $request){
        $validated = $request->validated();
        Log::info("Validated data:", $validated);
        try{
            User::create([
                'firstname' => $validated['firstname'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
            return redirect()->route('showLogin')->with(['message' => 'Signup Successful!']);

        }catch(Exception $e){
            Log::info(`Unexpected error:{$e}`);
            return redirect()->back()->withErrors(['error'=>"Unexpected error: " . $e->getMessage()]);
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('showLogin');
    }
}
