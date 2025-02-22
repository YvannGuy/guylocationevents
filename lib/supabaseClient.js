// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vérifier si les variables sont définies
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key are required");
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
