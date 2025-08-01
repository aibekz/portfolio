import { Link } from "react-router-dom";
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
            <div className="flex-1">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <div className="font-mono flex flex-col items-center justify-center text-center">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary">404</h1>
                        <p className="text-2xl md:text-4xl mb-2 text-primary">Page not found</p>
                        <p className="text-lg max-w-md text-primary">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/"
                            className="nav-link underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded text-lg font-medium"
                            aria-label="Go back to home page"
                        >
                            Back to Home &rarr;
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
