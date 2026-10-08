import {
  createClient
} from "@supabase/supabase-js";


const supabaseUrl =
  "https://uqbcxjolqcwzybcjlikx.supabase.co";


const supabaseKey =
  "sb_publishable_FVBKhgjqXGD9HnV2cr5qjQ_dnnYDDDA";


export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );