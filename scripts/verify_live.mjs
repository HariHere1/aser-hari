import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tduigjbrpkibnysdewhj.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNDk0MzUsImV4cCI6MjEwNTYyNTQzNX0.IrHVcdI6Racjp3UJS5tG7zPTXhXrpXIiKI0SDM1R6Pw';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA0OTQzNSwiZXhwIjoyMTA1NjI1NDM1fQ.UDD42pwPhUvLI30DM2yijWyxhPbtnXVYwViwR-YwhsE';

const anonClient = createClient(SUPABASE_URL, ANON_KEY);
const adminClient = createClient(SUPABASE_URL, SERVICE_KEY);

async function runVerification() {
  console.log('--- 1. TESTING STORAGE BUCKETS ---');
  const { data: buckets, error: bErr } = await adminClient.storage.listBuckets();
  if (bErr) {
    console.error('Error listing buckets:', bErr.message);
  } else {
    console.log('Buckets found:', buckets.map(b => ({ id: b.id, name: b.name, public: b.public })));
  }

  console.log('\n--- 2. TESTING ROW COUNTS & STRUCTURE (ADMIN) ---');
  const tables = [
    'profiles',
    'categories',
    'resources',
    'needs',
    'rides',
    'ride_members',
    'skills',
    'conversations',
    'conversation_participants',
    'messages',
    'notifications'
  ];

  for (const table of tables) {
    const { count, data, error } = await adminClient
      .from(table)
      .select('*', { count: 'exact' })
      .limit(2);
    if (error) {
      console.log(`Table ${table}: ERROR -> ${error.message} (${error.code})`);
    } else {
      console.log(`Table ${table}: ${count} rows. Sample keys: ${data.length > 0 ? Object.keys(data[0]).join(', ') : 'none'}`);
      if (data.length > 0) {
        console.log(`  Sample 1:`, JSON.stringify(data[0]));
      }
    }
  }

  console.log('\n--- 3. TESTING ANON QUERIES (What public/authenticated sees) ---');
  for (const table of ['resources', 'needs', 'rides', 'skills', 'profiles', 'categories']) {
    const { count, data, error } = await anonClient
      .from(table)
      .select('*', { count: 'exact' })
      .limit(2);
    if (error) {
      console.log(`Anon query ${table}: ERROR -> ${error.message}`);
    } else {
      console.log(`Anon query ${table}: SUCCESS, returned ${count} rows.`);
    }
  }

  console.log('\n--- 4. CHECKING AUTH USERS ---');
  const { data: authUsers, error: uErr } = await adminClient.auth.admin.listUsers();
  if (uErr) {
    console.error('Error listing auth users:', uErr.message);
  } else {
    console.log(`Auth users count: ${authUsers.users.length}`);
    authUsers.users.forEach(u => {
      console.log(`  User: id=${u.id}, email=${u.email}`);
    });
  }
}

runVerification().catch(console.error);
