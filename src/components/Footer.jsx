import { siteConfig } from '../constants/siteConfig';

export default function Footer() {
  return (
    <footer>
      <div className="max-w-3xl mx-auto p-6 flex items-center justify-center">
        <p className="tracking-wide text-gray-300">
          <span className="font-mono text-sm">git commit -m "Built by {siteConfig.author.logo}"</span>
        </p>
      </div>
    </footer>
  );
}
