import Form from "@/app/ui/signup-form";

export default function Signup() {
    return (
        <section className="w-full">
            <div className="mx-auto mt-12 max-w-sm">
                <h2 className="mb-8 text-center text-2xl font-bold">
                    Signup your account here
                </h2>

                <Form />
            </div>
        </section>
    );
}
