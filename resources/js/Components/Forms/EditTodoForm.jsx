import { useRequest } from "@/Library/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner";

export default function EditTodoForm({ closeModal, todo }) {


    const {
        register,
        setError,
        setValue,
        formState: { isSubmitting, errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            todo_id: todo.todo_id || "",
            title: todo.title || "",
            description: todo.description || "",
            due_date: todo?.due_date ? new Date(todo.due_date).toISOString().split("T")[0] : "", 
        }
    })
    const { isProcessing, putRequest } = useRequest();
    const onSubmitForm = async (data) => {
        console.log(data);
        putRequest('todos.update', data.todo_id, data, {
            onSuccess: (success) => {
                toast.success('Todo updated successfully', { duration: 3000 });
                reset();
                closeModal();
            },
            onError: (error) => {
                if (error) {
                    Object.entries(error).forEach(([Field, message]) => {
                        setError(Field, { message });
                    })
                }
                toast.error("Failed to update todo", { duration: 3000 });
            }
        })
    }
    return (
        <>
            <div className="modal-body">
                <form id="student-profile-form" className="p-4">
                    {/* Todo ID (Hidden) */}
                    <input type="hidden" {...register("todo_id")} />

                    {/* Title */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            placeholder="Title"
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        />
                        {errors.title && (
                            <div className="invalid-feedback">{errors.title.message}</div>
                        )}
                    </div>
                    {/* Description */}
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            type="text"
                            rows={"5"}
                            placeholder="Description"
                            {...register("description", { required: "Description is required" })}
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        />
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>
                    {/* Due Date */}
                    <div className="col-12 mb-3">
                        <label htmlFor="due_date" className="form-label">Due Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.due_date ? "is-invalid" : ""}`}
                            id="due_date"
                            {...register("due_date", {
                                required: "Due date is required",
                                validate: (value) =>
                                    new Date(value) >= new Date().setHours(0, 0, 0, 0) || "Due date cannot be in the past",
                            })}
                        />
                        {errors.due_date && <p className="text-danger">{errors.due_date.message}</p>}
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