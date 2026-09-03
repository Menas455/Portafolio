import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dnibiylynsrvisgmhipn.supabase.co";
const supabaseAnonKey = "sb_publishable_NJYm1MqZ5CsWBsy-VhFPsg_4fVXZZ3N";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

 