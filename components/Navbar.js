import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {session ? (
                    <>
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;