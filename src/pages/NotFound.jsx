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
            <div className="flex-grow flex items-center justify-center">
                <div className="font-mono flex flex-col items-center justify-center text-center px-4 py-20">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-darktext">404</h1>
                        <p className="text-2xl md:text-4xl mb-2 text-darktext">Page not found</p>
                        <p className="text-lg text-darktext max-w-md">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/"
                            className="text-linkblue underline focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded text-lg font-medium text-darktext"
                            aria-label="Go back to home page"
                        >
                            Back to Home &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
