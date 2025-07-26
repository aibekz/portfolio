import { siteConfig } from '../constants/siteConfig';
import { formatEmail } from '../utils';

const Contact = () => (
  <div className="px-6 py-20">
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold font-mono mb-6">Contact</h1>
        <p className="font-mono text-2xl mb-4">
          {formatEmail(siteConfig.email)}
        </p>
    </div>
  </div>
);

export default Contact;
