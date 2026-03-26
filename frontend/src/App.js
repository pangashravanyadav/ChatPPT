import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

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
    </AuthProvider>
  );
};

export default App;