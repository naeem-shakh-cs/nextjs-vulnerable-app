import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !session) {
      router.push('/login?callbackUrl=' + encodeURIComponent(router.pathname));
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="page-loader">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;