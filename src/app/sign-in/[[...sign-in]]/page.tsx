import { SignIn } from "@clerk/nextjs";


export default function SignInPage() {
    return (
        <div className="flex min-h-full items-center justify-center bg-background scrollbar-hide overflow-hidden">
            <SignIn
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