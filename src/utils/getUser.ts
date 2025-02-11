import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const getProfile = async (setUser: (user: User) => void) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    setUser(user); // Passing setUser as a state setter
    console.log(user); // Optional: for debugging
  } else {
    console.log("No user found.");
  }
};
