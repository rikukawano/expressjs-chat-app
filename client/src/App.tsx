import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/HomePage";
import LoginPage from "./pages/SignInPage";

function App() {
  return (
    <AppProvider>
      <SignedOut>
        <LoginPage />
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
    </AppProvider>
  );
}

export default App;
