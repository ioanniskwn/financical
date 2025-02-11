import { supabase } from "@/lib/supabase";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Google Sign-In Error:", error);
  } else {
    console.log("Google Sign-In Success:", data);
  }
};

export const handleSignout = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};
