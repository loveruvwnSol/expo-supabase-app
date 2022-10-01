import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vnydgstacjbighveoveb.supabase.co" || "";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZueWRnc3RhY2piaWdodmVvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1OTg1MDEsImV4cCI6MTk4MDE3NDUwMX0.nZPkXcECxu7qWDAw19ZeoTLoeo8r_NO682g2IRWH6ZA" || "";
export const supabase = createClient(supabaseUrl, supabaseKey);