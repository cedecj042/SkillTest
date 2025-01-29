import { useRequest } from "@/Library/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner";

export default function EditUserForm({ closeModal, user }) {


    const {
        register,
        setError,
        setValue,
        formState: { isSubmitting, errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            user_id: user.user_id || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
        }
    })
    const { isProcessing, putRequest } = useRequest();
    const onSubmitForm = async (data) => {
        putRequest('users.update', data.user_id, data, {
            onSuccess: (success) => {
                toast.success('User updated successfully', { duration: 3000 });
                reset();
                closeModal();
            },
            onError: (error) => {
                if (error) {
                    Object.entries(error).forEach(([Field, message]) => {
                        setError(Field, { message });
                    })
                }
                toast.error("Failed to update user", { duration: 3000 });
            }
        })
    }
    return (
        <>
            <div className="modal-body">
                <form id="student-profile-form" className="p-4">
                    {/* Student ID (Hidden) */}
                    <input type="hidden" {...register("user_id")} />

                    {/* First Name */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            {...register("firstname", { required: "First name is required" })}
                            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                        />
                        {errors.firstname && (
                            <div className="invalid-feedback">{errors.firstname.message}</div>
                        )}
                    </div>
                    {/* Last Name */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            {...register("lastname", { required: "Last name is required" })}
                            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                        />
                        {errors.lastname && (
                            <div className="invalid-feedback">{errors.lastname.message}</div>
                        )}
                    </div>
                    {/* Last Name */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            {...register("email", { required: "Email is required" })}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>
                </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isSubmitting || isProcessing}
                    onClick={handleSubmit(onSubmitForm)}
                >
                    Save Changes
                </button>
            </div>

        </>
    )
}