import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignout, signInWithGoogle } from "@/utils/auth";
import { User } from "@supabase/supabase-js";

interface SiteHeaderProps {
  user: User | null;
}

// Use the props interface in the component
export const SiteHeader: React.FC<SiteHeaderProps> = ({ user }) => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
          </Button>
        </div>
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold tracking-tight">
            FINANCIAL TIMES
          </span>
        </a>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Subscribe
          </Button>
          {!user ? (
            <>
              <Button variant="ghost" size="sm" onClick={signInWithGoogle}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleSignout}>
                Sign out{" "}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
