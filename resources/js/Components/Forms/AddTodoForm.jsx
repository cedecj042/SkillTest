import { useRequest } from "@/Library/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTodoForm({ closeModal }) {
    const {
        register,
        setError,
        setValue,
        formState: { isSubmitting, errors },
        handleSubmit,
        reset
    } = useForm();

    const { isProcessing, postRequest } = useRequest();

    const onSubmit = async (data) =>{
        postRequest('todos.store',data,{
            onSuccess: (data) => {  
                toast.success(data.props.flash.sucess, { duration: 3000 });
                reset(); 
                closeModal();
            },
            onError: (error) => {
                if (error) {
                    Object.entries(error).forEach(([field, message]) => {
                        setError(field,{message:message});
                        console.log(`Field: ${field}, Error: ${message}`);
                    });
                } 
                toast.error("Failed to add todo. Please try again.", { duration: 3000 });
            }
        })
    }
    return (
        <>
            <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <div className="col-12 stagger-item">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter Todo Title"
                            {...register("title", {
                                required: "Title is required",
                                maxLength: {
                                    value: 255,
                                    message: "Title must not exceed 255 characters",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.title?.message}</p>
                    </div>

                    {/* Description */}
                    <div className="col-12 stagger-item">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            placeholder="Enter Todo Description"
                            rows="4"
                            {...register("description", {
                                required: "Description is required",
                                maxLength: {
                                    value: 500,
                                    message: "Description must not exceed 500 characters",
                                },
                            })}
                        ></textarea>
                        <p className="text-danger">{errors.description?.message}</p>
                    </div>

                    {/* Due Date */}
                    <div className="col-12 stagger-item">
                        <label htmlFor="due_date" className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="due_date"
                            {...register("due_date", {
                                required: "Due date is required",
                                validate: (value) =>
                                    new Date(value) >= new Date() || "Due date cannot be in the past",
                            })}
                        />
                        <p className="text-danger">{errors.due_date?.message}</p>
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
                    onClick={handleSubmit(onSubmit)}
                >
                    Add Todo
                </button>
            </div>
        </>
    );
}