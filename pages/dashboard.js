import { useSession } from 'next-auth/react';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { data: session } = useSession();
  
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.card}>
        <h2>Protected Content</h2>
        <p>This is a protected page secured by middleware. Only authenticated users can see this.</p>
        <div className={styles.secretInfo}>
          <h3>Secret Information</h3>
          <p>API Keys: X92nJdsL8aQp03Mf</p>
          <p>Database Connection String: mongodb://user:password@localhost:27017/db</p>
          <p>Server Endpoints: https://api.example.com/v1/private</p>
        </div>
      </div>
      
      <div className={styles.userInfo}>
        <h2>User Information</h2>
        {session && (
          <div>
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>User ID:</strong> {session.user.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}