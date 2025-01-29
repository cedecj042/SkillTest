import { Toaster } from "sonner";


export default function GuestLayout({ children }) {
    return (
        <>
            <div className="background"></div>
            <Toaster
                position="bottom-right"
                richColors
                toastOptions={{
                    style: {
                        right: "1rem",
                        fontSize: "1rem",
                    },
                }}
                closeButton
            />
            {children}
        </>
    );
}
