import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-background py-4 px-6 sm:left-64 sm:relative">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; {currentYear} CommerceVista. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link to="#" className="hover:text-primary">
            Support
          </Link>
          <Link to="#" className="hover:text-primary">
            Documentation
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;