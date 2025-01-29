<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ];
    }

    public function messages(): array
{
    return [
        // Email Validation Messages
        'email.required' => 'The email field is required.',
        'email.string' => 'The email must be a valid string.',
        'email.max' => 'The email must not exceed 255 characters.',

        // Password Validation Messages
        'password.required' => 'The password field is required.',
        'password.string' => 'The password must be a valid string.',
    ];
}

}
