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
                        <h1 className="text-6xl md:text-8xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>404</h1>
                        <p className="text-2xl md:text-4xl mb-2" style={{ color: 'var(--text-color)' }}>Page not found</p>
                        <p className="text-lg max-w-md" style={{ color: 'var(--text-color)' }}>
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/"
                            className="underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded text-lg font-medium transition-colors duration-200"
                            style={{ color: 'var(--link-color)' }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
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
