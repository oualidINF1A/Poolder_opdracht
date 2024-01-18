'use client'

import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient( //TODO HIDE THESE KEYS
    "https://gxwpgckgdjtenrsebwfb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BnY2tnZGp0ZW5yc2Vid2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NTgwMTQsImV4cCI6MjAyMTAzNDAxNH0.qSP2V-2YCeYvBiUt6jEcvVij8VGNok65XggM5RBRgRE"
)

export {supabase}