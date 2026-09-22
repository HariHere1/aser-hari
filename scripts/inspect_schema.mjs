import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tduigjbrpkibnysdewhj.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA0OTQzNSwiZXhwIjoyMTA1NjI1NDM1fQ.UDD42pwPhUvLI30DM2yijWyxhPbtnXVYwViwR-YwhsE';

async function inspect() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SERVICE_KEY}`);
  const spec = await res.json();
  
  console.log('Tables in PostgREST OpenAPI spec:');
  for (const [name, def] of Object.entries(spec.definitions || {})) {
    console.log(`\n=== Table: ${name} ===`);
    for (const [colName, col] of Object.entries(def.properties || {})) {
      let extra = '';
      if (col.enum) extra = ` ENUM: [${col.enum.join(', ')}]`;
      if (col.format) extra += ` format: ${col.format}`;
      if (col.type) extra += ` type: ${col.type}`;
      if (col.description) extra += ` desc: ${col.description}`;
      console.log(`  - ${colName}: ${extra}`);
    }
  }
}

inspect().catch(console.error);
