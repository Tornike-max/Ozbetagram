import supabase from "./supabase";

export async function getAuthProfiles() {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw Error(error.message);

  return data;
}
