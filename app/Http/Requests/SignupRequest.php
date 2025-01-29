<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|unique:users,email|email|max:255',
            'password' => 'required|string|min:6',
            'confirmPassword' => 'required|string|same:password',
        ];
    }
    public function messages(): array
    {
        return [
            // First Name
            'firstname.required' => 'The first name is required.',
            'firstname.string' => 'The first name must be a valid string.',
            'firstname.max' => 'The first name must not exceed 255 characters.',

            // Last Name
            'lastname.required' => 'The last name is required.',
            'lastname.string' => 'The last name must be a valid string.',
            'lastname.max' => 'The last name must not exceed 255 characters.',

            // Email
            'email.required' => 'The email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email address is already registered.',
            'email.max' => 'The email must not exceed 255 characters.',

            // Password
            'password.required' => 'The password is required.',
            'password.string' => 'The password must be a valid string.',
            'password.min' => 'The password must be at least 6 characters.',

            // Confirm Password
            'confirmPassword.required' => 'The confirm password is required.',
            'confirmPassword.string' => 'The confirm password must be a valid string.',
            'confirmPassword.same' => 'The confirm password must match the password.',
        ];
    }

}
