import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarLinkContext } from './Layout';

export default function MainLinks() {
  const location = useLocation();
  const [path, setPath] = useState(null);

  const link = useContext(SidebarLinkContext);
  
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  // Ensure link has necessary properties
  if (!link || !link.path) {
    return null; // or a fallback UI if the link is not defined
  }

  // console.log("Current Path:", path, "Link Path:", link.path);

  return (
    <Link
      to={link.path}
      className={`${path === link.path ? `${link.class || 'default-class'} bg-blue-500 text-white` : 'flex items-center gap-2 px-2'}`}
    >
      {link.icon}
      {link.title}
    </Link>
  );
}
