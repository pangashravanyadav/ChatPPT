import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Inner component — reads auth state
const AppContent = () => {
  const { user } = useAuth();

  // If logged in → show Chat, else → show Login
  return user ? <Chat /> : <Login />;
};

// Outer component — wraps everything with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
      <SpeedInsights />
    </AuthProvider>
  );
};

export default App;