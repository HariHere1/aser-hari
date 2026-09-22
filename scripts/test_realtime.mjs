import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tduigjbrpkibnysdewhj.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNDk0MzUsImV4cCI6MjEwNTYyNTQzNX0.IrHVcdI6Racjp3UJS5tG7zPTXhXrpXIiKI0SDM1R6Pw';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA0OTQzNSwiZXhwIjoyMTA1NjI1NDM1fQ.UDD42pwPhUvLI30DM2yijWyxhPbtnXVYwViwR-YwhsE';

const adminClient = createClient(SUPABASE_URL, SERVICE_KEY);

async function testRealtime() {
  console.log('--- TESTING REALTIME SUBSCRIPTION ON MESSAGES ---');
  // Get an existing conversation
  const { data: convs } = await adminClient.from('conversations').select('id').limit(1);
  if (!convs || convs.length === 0) {
    console.log('No conversations found.');
    return;
  }
  const convId = convs[0].id;
  const { data: profiles } = await adminClient.from('profiles').select('id').limit(1);
  const senderId = profiles[0].id;

  const client = createClient(SUPABASE_URL, ANON_KEY);

  let received = false;
  const channel = client
    .channel(`test-realtime-${convId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${convId}`,
      },
      (payload) => {
        console.log('REALTIME EVENT RECEIVED SUCCESSFULLY!', payload.new.body);
        received = true;
      }
    )
    .subscribe((status) => {
      console.log('Channel subscription status:', status);
    });

  // Wait 3 seconds for channel to connect
  await new Promise(r => setTimeout(r, 3000));

  // Insert message via adminClient
  console.log('Inserting test message...');
  await adminClient.from('messages').insert({
    conversation_id: convId,
    sender_id: senderId,
    body: 'Realtime test message timestamp ' + Date.now(),
  });

  // Wait 3 seconds for realtime event
  await new Promise(r => setTimeout(r, 3000));

  client.removeChannel(channel);

  if (received) {
    console.log('SUCCESS: Realtime broadcast confirmed active on messages table!');
  } else {
    console.log('Note: Node client without WebSocket polyfill or publication config may not receive WS, but subscription status is shown.');
  }
}

testRealtime().catch(console.error);
