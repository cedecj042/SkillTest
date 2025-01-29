import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export const useRequest = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const defaultCallbacks = {
        onSuccess: () => {
            toast.success("Request successful", { duration: 3000 });
        },
        onError: () => {
            toast.error("Unexpected error", { duration: 3000 });
        },
        onFinish: () => {
            setIsProcessing(false);
        },
    };

    // POST request handler
    const postRequest = async (routeName, data, customCallbacks = {}, options = {}) => {
        setIsProcessing(true);

        try {
            await router.post(route(routeName), data, {
                ...options, // Use only custom options
                onSuccess: (page) => {
                    (customCallbacks.onSuccess || defaultCallbacks.onSuccess)(page);
                },
                onError: (page) => {
                    (customCallbacks.onError || defaultCallbacks.onError)(page);
                },
                onFinish: () => {
                    (customCallbacks.onFinish || defaultCallbacks.onFinish)();
                },
            });
        } catch (error) {
            defaultCallbacks.onError(error);
            setIsProcessing(false);
        }
    };

    // PUT request handler
    const putRequest = async (routeName, id, data, customCallbacks = {}, options = {}) => {
        setIsProcessing(true);

        try {
            await router.put(route(routeName, { id }), data, {
                ...options,
                onSuccess: (page) => {
                    (customCallbacks.onSuccess || defaultCallbacks.onSuccess)(page);
                },
                onError: (page) => {
                    (customCallbacks.onError || defaultCallbacks.onError)(page);
                },
                onFinish: () => {
                    (customCallbacks.onFinish || defaultCallbacks.onFinish)();
                },
            });
        } catch (error) {
            defaultCallbacks.onError(error);
            setIsProcessing(false);
        }
    };

    // GET request handler
    const getRequest = async (routeName, params = {}, customCallbacks = {}, options = {}) => {
        setIsProcessing(true);

        try {
            await router.get(route(routeName, params), {
                ...options,
                onSuccess: (page) => {
                    (customCallbacks.onSuccess || defaultCallbacks.onSuccess)(page);
                },
                onError: (page) => {
                    (customCallbacks.onError || defaultCallbacks.onError)(page);
                },
                onFinish: () => {
                    (customCallbacks.onFinish || defaultCallbacks.onFinish)();
                },
            });
        } catch (error) {
            defaultCallbacks.onError(error);
            setIsProcessing(false);
        }
    };

    // DELETE request handler
    const deleteRequest = async (routeName, params, customCallbacks = {}, options = {}) => {
        setIsProcessing(true);

        try {
            await router.delete(route(routeName, params), {
                ...options,
                onSuccess: (page) => {
                    (customCallbacks.onSuccess || defaultCallbacks.onSuccess)(page);
                },
                onError: (page) => {
                    (customCallbacks.onError || defaultCallbacks.onError)(page);
                },
                onFinish: () => {
                    (customCallbacks.onFinish || defaultCallbacks.onFinish)();
                },
            });
        } catch (error) {
            defaultCallbacks.onError(error);
            setIsProcessing(false);
        }
    };

    return { isProcessing, postRequest, putRequest, getRequest, deleteRequest };
};


export const useAxiosRequest = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const defaultCallbacks = {
        onSuccess: () => {
            toast.success("Request successful", { duration: 3000 });
        },
        onError: (error) => {
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || "Something went wrong"}`, { duration: 3000 });
            } else if (error.request) {
                toast.error("No response from the server", { duration: 3000 });
            } else {
                toast.error(`Error: ${error.message}`, { duration: 3000 });
            }
        },
        onFinish: () => {
            setIsProcessing(false);
        },
    };

    // Helper function for making requests
    const makeRequest = async (method, url, data, customCallbacks, options) => {
        setIsProcessing(true);

        try {
            const response = await axios({
                method,
                url,
                data,
                ...options, // Include any additional Axios options
            });

            (customCallbacks.onSuccess || defaultCallbacks.onSuccess)(response.data);
        } catch (error) {
            (customCallbacks.onError || defaultCallbacks.onError)(error);
        } finally {
            (customCallbacks.onFinish || defaultCallbacks.onFinish)();
        }
    };

    // POST request handler
    const postRequest = async (url, data, customCallbacks = {}, options = {}) => {
        await makeRequest("post", url, data, customCallbacks, options);
    };

    // PUT request handler
    const putRequest = async (url, data, customCallbacks = {}, options = {}) => {
        await makeRequest("put", url, data, customCallbacks, options);
    };

    // GET request handler
    const getRequest = async (url, params = {}, customCallbacks = {}, options = {}) => {
        await makeRequest("get", url, null, customCallbacks, { ...options, params });
    };

    // DELETE request handler
    const deleteRequest = async (url, params = {}, customCallbacks = {}, options = {}) => {
        await makeRequest("delete", url, null, customCallbacks, { ...options, params });
    };

    return { isProcessing, postRequest, putRequest, getRequest, deleteRequest };
};
