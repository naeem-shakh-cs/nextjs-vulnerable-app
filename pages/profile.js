import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const Profile = () => {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <Layout>
        <h1>Profile</h1>
        {session ? (
          <div>
            <p>Welcome, {session.user.name}!</p>
            <p>Email: {session.user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;