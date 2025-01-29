import { useRequest } from "@/Library/hooks";
import { useForm } from "react-hook-form";

export default function AddUserForm({ onClose }) {
    const {
        register,
        setError,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm();

    const { isProcessing, postRequest } = useRequest();

    return (
        <>
            <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-grid grid-2">
                        <div className="col stagger-item">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control auth-textbox"
                                id="firstname"
                                placeholder="Juan"
                                {...register('firstname', {
                                    required: "First name is required"
                                })}
                            />
                            <p className="text-danger">{errors.firstname?.message}</p>
                        </div>

                        <div className="col stagger-item">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control auth-textbox"
                                id="lastname"
                                placeholder="Dela Cruz"
                                {...register('lastname', {
                                    required: "Last name is required"
                                })}
                            />
                            <p className="text-danger">{errors.lastname?.message}</p>
                        </div>
                    </div>
                    <div className="col-12 stagger-item">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control auth-textbox"
                            id="email"
                            placeholder="sample@email.com"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>

                    <div className="col-12 stagger-item">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control auth-textbox"
                            id="password"
                            placeholder="********"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        <p className="text-danger">{errors.password?.message}</p>
                    </div>
                    <div className="col-12 stagger-item">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control auth-textbox"
                            id="confirmPassword"
                            placeholder="********"
                            {...register('confirmPassword', {
                                required: "Please confirm your password"
                            })}
                        />
                        <p className="text-danger">{errors.confirmPassword?.message}</p>
                    </div>
                </form>

            </div>
        </>
    );
}