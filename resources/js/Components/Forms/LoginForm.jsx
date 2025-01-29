import { useRequest } from "@/Library/hooks";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
        setError,
        reset,
    } = useForm();

    const { isProcessing, postRequest } = useRequest();
    const onSubmit = async (data) => {
        postRequest('login', data, {
            onSuccess: (data) => {
                console.log(data);
                toast.success('Login Successful', { duration: 3000 });
            },
            onError: (error) => {
                if (error) {
                    if (error.error) {
                        // setError('general', { message: error.error });
                        toast.error(error.error, { duration: 3000 });
                    } else {
                        Object.entries(error).forEach(([field, message]) => {
                            setError(field, { message });
                            console.log(`Field: ${field}, Error: ${message}`);
                        });
                        toast.error("Login Unsuccessful", { duration: 3000 });
                    }
                }
                console.log(error);
            }
        });
    };


    const formRef = useRef(null);
    useEffect(() => {
        const elements = formRef.current.querySelectorAll('.stagger-item');

        gsap.from(elements, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="mb-5">
                {/* {errors.general && (
                    <div className="alert alert-danger text-center">
                        {errors.general.message}
                    </div>
                )} */}
                <div className="mb-3 input-group-lg stagger-item">
                    <label htmlFor="email" className="form-label auth-labels"> Email </label>
                    <input
                        type="text"
                        className="form-control auth-textbox mb-1"
                        placeholder="email@example.com"
                        id="email"
                        name="email"
                        {...register('email', {
                            required: "Email is required"
                        })}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                </div>
                <div className="mb-3 input-group-lg stagger-item">
                    <label
                        htmlFor="password"
                        className="form-label auth-labels"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control auth-textbox mb-1"
                        placeholder="*****"
                        id="password"
                        name="password"
                        {...register('password', {
                            required: "Password is required"
                        })}
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || isProcessing}
                    className={`btn btn-primary w-100 btn-lg auth-btn stagger-item btn-size`}
                >
                    Login
                </button>
            </form>
        </>
    );
}