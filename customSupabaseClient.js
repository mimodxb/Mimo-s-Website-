import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkuhaupwlxadvihnnned.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdWhhdXB3bHhhZHZpaG5ubmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNDgyODcsImV4cCI6MjA4MzgyNDI4N30.x5LM9upab4cwhgobd4ybC0QV9MPvHOSdBKmDV07cwk4';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
