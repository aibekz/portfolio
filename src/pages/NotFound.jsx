import Button from "../components/ui/Button";
import SEO from "../components/SEO";
import { siteConfig } from "../constants/siteConfig";

export default function NotFound() {
    return (
        <>
            <SEO 
                title="Page Not Found"
                description="The page you're looking for doesn't exist."
                url={`${siteConfig.url}404`}
            />
            <div className="flex-grow flex items-center justify-center">
                <div className="font-mono flex flex-col items-center justify-center text-center px-4 py-20">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gray-900">404</h1>
                        <p className="text-2xl md:text-4xl mb-2 text-gray-700">Page not found</p>
                        <p className="text-lg text-gray-600 max-w-md">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            to="/"  
                            size="lg"
                            className="rounded-lg flex items-center gap-2"
                        >
                            Back to Home <span>&rarr;</span>
                        </Button>
                        <Button 
                            to="/contact"
                            variant="outline"
                            size="lg"
                            className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
