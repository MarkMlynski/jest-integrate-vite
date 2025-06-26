import { LoginButton } from "./components/LoginButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen font-sans bg-brand-bg text-brand-gray px-4">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold tracking-widest cascading-colors">
          {"Google Login + Database Integration".split('').map((char, index) => (
            <span key={index} style={{'--delay': index} as React.CSSProperties}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <LoginButton />
      </header>

      {user ? (
        <main className="py-8 space-y-6">
          <div className="bg-brand-bg border border-brand-blue/30 rounded-lg p-6 shadow-lg">
            <h2 className="text-brand-pink text-xl font-semibold mb-4">Features Implemented:</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                React + Vite + TypeScript setup
              </li>
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                Firebase Google Authentication
              </li>
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                PostgreSQL database integration
              </li>
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                Drizzle ORM with schema migrations
              </li>
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                User data synchronization (Firebase → Database)
              </li>
              <li className="flex items-center text-brand-lime">
                <span className="text-brand-blue mr-2">✓</span>
                Jest testing framework configured
              </li>
            </ul>
          </div>
          
          <div className="bg-brand-bg border border-brand-pink/30 rounded-lg p-6 shadow-lg">
            <h3 className="text-brand-blue text-lg font-semibold mb-4">User Information:</h3>
            <div className="space-y-2">
              <p><span className="text-brand-pink font-semibold">Email:</span> <span className="text-brand-lime">{user.email}</span></p>
              <p><span className="text-brand-pink font-semibold">Display Name:</span> <span className="text-brand-lime">{user.displayName}</span></p>
              <p><span className="text-brand-pink font-semibold">Firebase UID:</span> <span className="text-brand-gray text-sm">{user.uid}</span></p>
              <p className="text-brand-gray text-sm mt-4 border-t border-brand-gray/20 pt-3">
                User data is automatically saved to PostgreSQL database when you sign in.
              </p>
            </div>
          </div>
          
          <div className="bg-brand-bg border border-brand-lime/30 rounded-lg p-6 shadow-lg">
            <h3 className="text-brand-lime text-lg font-semibold mb-4">Database Schema:</h3>
            <p className="text-brand-gray mb-3">The following tables have been created:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-brand-pink mr-2">•</span>
                <code className="bg-brand-gray/20 px-2 py-1 rounded text-brand-blue">users</code>
                <span className="text-brand-gray ml-2">- Stores user profile information</span>
              </li>
              <li className="flex items-center">
                <span className="text-brand-pink mr-2">•</span>
                <code className="bg-brand-gray/20 px-2 py-1 rounded text-brand-blue">user_sessions</code>
                <span className="text-brand-gray ml-2">- Manages user session data</span>
              </li>
            </ul>
          </div>
        </main>
      ) : (
        <p className="mt-20 text-center text-brand-gold animate-pulse text-3xl font-semibold tracking-widest">
          Connect your cosmic wallet &nbsp;🚀
        </p>
      )}
    </div>
  );
}

export default App;