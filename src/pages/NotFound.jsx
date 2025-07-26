import Button from "../components/ui/Button";

export default function NotFound() {
    return (
        <div className="font-mono flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-8xl font-bold mb-4">404</h1>
            <p className="text-4xl mb-6">Page not found.</p>
            <Button 
                to="/"  
                size="lg"
                className="rounded flex items-center gap-2"
            >
                Back to home <span>&rarr;</span>
            </Button>
        </div>
    );
}
