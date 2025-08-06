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
            <div className="flex-1 flex items-center justify-center px-6 py-8">
                <div className="font-mono flex flex-col items-center text-center">
                    <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary">404</h1>
                    <p className="text-2xl md:text-4xl mb-2 text-primary">Page not found</p>
                    <p className="text-lg max-w-md text-primary mb-8">
                        The page you're looking for can’t be found or doesn't exist anymore.
                    </p>
                    <Link 
                        to="/"
                        className="text-accent hover:underline text-lg font-medium"
                        aria-label="Go back to home page"
                    >
                        &larr; Go to Aibek Z Home 
                    </Link>
                </div>
            </div>
        </>
    );
}
