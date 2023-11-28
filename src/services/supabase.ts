import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gbjjvqqgufxjmmoeimtg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiamp2cXFndWZ4am1tb2VpbXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MDA0MTUsImV4cCI6MjAxNTk3NjQxNX0.elHlEpKG4JOWAxZDgy8gmUhW6-1rv2aqjbjmvDi0FfA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
