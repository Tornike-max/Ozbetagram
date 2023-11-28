import supabase from "./supabase";

export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Failed to login");
    throw new Error(error.message);
  }

  return { data };
}

export async function signup({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    // User signup using Supabase auth
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (user) {
      // Insert user data into a table (e.g., "profiles")
      const { data: userData, error: userDataError } = await supabase
        .from("user") // Replace "profiles" with your actual table name
        .insert([{ username, user_id: user?.id }]) // Assuming you want to store username and user_id in the table
        .single(); // Assuming you're inserting a single row

      if (userDataError) {
        throw new Error(userDataError.message);
      }

      return userData; // Return inserted user data
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Failed to get user");
  }
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error?.message);
  }
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error(error.hint);
  }

  return data;
}

export async function editUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  let query;
  if (!password) {
    query = await supabase.auth.updateUser({
      email,
      data: { username },
    });
  } else {
    query = await supabase.auth.updateUser({
      password,
    });
  }
  const { data, error } = query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteUser(userId: string) {
  try {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      throw new Error(`Error in users table: ${error.message}`);
    }

    const { error: deleteError } = await supabase.auth.updateUser({
      id: userId,
      data: { status: "deactivated" },
    });

    if (deleteError) {
      throw new Error(`Error in auth users: ${deleteError.message}`);
    }
  } catch (err) {
    throw new Error("Failed to delete user(s).");
  }
}
