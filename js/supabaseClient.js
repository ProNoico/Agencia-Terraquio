// js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://rwndahfhxxasuwycfjug.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bmRhaGZoeHhhc3V3eWNmanVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMzA3MjUsImV4cCI6MjA2ODYwNjcyNX0.gZCP_LDl_WDqnhIIDHdqa-kWsDkYpxJ6RQxZcPtC0ZQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);