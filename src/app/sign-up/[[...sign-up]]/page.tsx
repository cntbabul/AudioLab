import { SignUp } from "@clerk/nextjs";


export default function SignUpPage() {
    return (
        <div className="flex min-h-full items-center justify-center bg-background scrollbar-hide overflow-hidden">
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg"
                    }
                }}
            />
        </div>
    );
}   