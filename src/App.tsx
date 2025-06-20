import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Men from "./pages/Men";
import Women from "./pages/Women";
import NewFaces from "./pages/NewFaces";
import Talent from "./pages/Talent";
import NotFound from "./pages/NotFound";
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Status from '@/pages/Status';

// Create a QueryClient instance for managing server state and caching
// This is used by React Query for data fetching and state management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

console.log('App component initializing...');

// Main App component that sets up routing and global providers
function App() {
  console.log('App component rendering...');
  
  return (
    // QueryClientProvider enables React Query throughout the entire app
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider enables authentication throughout the app */}
      <AuthProvider>
        {/* TooltipProvider enables tooltip functionality across all components */}
        <TooltipProvider>
          {/* Toast notifications setup - these show success/error messages to users */}
          <Toaster />   {/* Standard toast notifications */}
          <Sonner />    {/* Alternative sonner-style notifications */}
          
          {/* BrowserRouter enables client-side routing for single-page application */}
          <BrowserRouter>
            <Routes>
              {/* Homepage route - shows the main landing page with video background */}
              <Route path="/" element={<Index />} />
              
              {/* Application form route - where potential models can apply */}
              <Route path="/apply" element={<Apply />} />
              
              {/* Authentication route - login and signup for admin users */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Admin dashboard route - protected admin interface */}
              <Route path="/admin" element={<Admin />} />
              
              {/* Updated model category pages with actual functionality */}
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/new-faces" element={<NewFaces />} />
              <Route path="/talent" element={<Talent />} />
              
              {/* Additional routes */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/status" element={<Status />} />
              
              {/* Catch-all route for any URL that doesn't match above routes */}
              {/* IMPORTANT: Keep this "*" route last - it catches all unmatched URLs */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
