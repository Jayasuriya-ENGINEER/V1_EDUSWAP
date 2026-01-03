import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env", // exact file name
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default supabase;
