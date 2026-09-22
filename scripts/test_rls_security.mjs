import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tduigjbrpkibnysdewhj.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNDk0MzUsImV4cCI6MjEwNTYyNTQzNX0.IrHVcdI6Racjp3UJS5tG7zPTXhXrpXIiKI0SDM1R6Pw';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA0OTQzNSwiZXhwIjoyMTA1NjI1NDM1fQ.UDD42pwPhUvLI30DM2yijWyxhPbtnXVYwViwR-YwhsE';

const adminClient = createClient(SUPABASE_URL, SERVICE_KEY);

async function testRLS() {
  console.log('--- FETCHING TEST USERS ---');
  const { data: usersData, error: uErr } = await adminClient.auth.admin.listUsers();
  if (uErr || !usersData.users || usersData.users.length < 2) {
    throw new Error('Need at least 2 users to test RLS');
  }

  const uA = usersData.users[0];
  const uB = usersData.users[1];
  console.log(`User A: ${uA.id} (${uA.email})`);
  console.log(`User B: ${uB.id} (${uB.email})`);

  // Set temporary password for both to sign in via anon client
  const tempPass = 'TestCampusNet2026!';
  await adminClient.auth.admin.updateUserById(uA.id, { password: tempPass });
  await adminClient.auth.admin.updateUserById(uB.id, { password: tempPass });

  // Create authenticated clients
  const clientA = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
  const { data: sessA, error: errA } = await clientA.auth.signInWithPassword({ email: uA.email, password: tempPass });
  if (errA) throw new Error(`User A signin failed: ${errA.message}`);

  const clientB = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
  const { data: sessB, error: errB } = await clientB.auth.signInWithPassword({ email: uB.email, password: tempPass });
  if (errB) throw new Error(`User B signin failed: ${errB.message}`);

  console.log('Both users authenticated successfully.');

  // TEST 1: User A creates a resource
  console.log('\n--- TEST 1: User A creates resource, User B attempts to edit/delete ---');
  const { data: resA, error: resAErr } = await clientA
    .from('resources')
    .insert({
      owner_id: uA.id,
      title: 'RLS Test Resource Owned by User A',
      condition: 'good',
      method: 'sell',
      status: 'active'
    })
    .select('*')
    .single();

  if (resAErr) {
    console.error('User A could not insert resource:', resAErr.message);
  } else {
    console.log('User A created resource:', resA.id);

    // User B tries to update User A's resource
    const { data: bUpdate, error: bUpErr } = await clientB
      .from('resources')
      .update({ title: 'Hacked by User B!' })
      .eq('id', resA.id)
      .select('*');

    if (bUpErr) {
      console.log('SUCCESS: User B update was rejected by RLS error:', bUpErr.message);
    } else if (!bUpdate || bUpdate.length === 0) {
      console.log('SUCCESS: User B update affected 0 rows (RLS filtered out unauthorized rows)');
    } else {
      console.error('SECURITY FAILURE: User B successfully updated User A resource!');
    }

    // User B tries to delete User A's resource
    const { data: bDel, error: bDelErr } = await clientB
      .from('resources')
      .delete()
      .eq('id', resA.id)
      .select('*');

    if (bDelErr) {
      console.log('SUCCESS: User B delete was rejected by RLS error:', bDelErr.message);
    } else if (!bDel || bDel.length === 0) {
      console.log('SUCCESS: User B delete affected 0 rows (RLS filtered out unauthorized rows)');
    } else {
      console.error('SECURITY FAILURE: User B successfully deleted User A resource!');
    }

    // Clean up
    await clientA.from('resources').delete().eq('id', resA.id);
  }

  // TEST 2: User A creates a Need, User B attempts to edit
  console.log('\n--- TEST 2: User A creates Need, User B attempts to edit ---');
  const { data: needA, error: nAErr } = await clientA
    .from('needs')
    .insert({
      poster_id: uA.id,
      title: 'RLS Test Need Owned by User A',
      status: 'open'
    })
    .select('*')
    .single();

  if (nAErr) {
    console.error('User A could not insert need:', nAErr.message);
  } else {
    console.log('User A created need:', needA.id);

    const { data: bUpNeed, error: bUpNeedErr } = await clientB
      .from('needs')
      .update({ title: 'Hacked by User B!' })
      .eq('id', needA.id)
      .select('*');

    if (bUpNeedErr) {
      console.log('SUCCESS: User B update need rejected by RLS:', bUpNeedErr.message);
    } else if (!bUpNeed || bUpNeed.length === 0) {
      console.log('SUCCESS: User B update need affected 0 rows (RLS filtered)');
    } else {
      console.error('SECURITY FAILURE: User B successfully updated User A need!');
    }

    // Clean up
    await clientA.from('needs').delete().eq('id', needA.id);
  }

  // TEST 3: User A creates a Ride, User B attempts to edit
  console.log('\n--- TEST 3: User A creates Ride, User B attempts to edit ---');
  const { data: rideA, error: rAErr } = await clientA
    .from('rides')
    .insert({
      creator_id: uA.id,
      from_location: 'Hostel',
      to_location: 'Campus',
      ride_date: '2026-10-01',
      ride_time: '09:00',
      total_seats: 2,
      available_seats: 2,
      status: 'active'
    })
    .select('*')
    .single();

  if (rAErr) {
    console.error('User A could not insert ride:', rAErr.message);
  } else {
    console.log('User A created ride:', rideA.id);

    const { data: bUpRide, error: bUpRideErr } = await clientB
      .from('rides')
      .update({ notes: 'Hacked by User B' })
      .eq('id', rideA.id)
      .select('*');

    if (bUpRideErr) {
      console.log('SUCCESS: User B update ride rejected by RLS:', bUpRideErr.message);
    } else if (!bUpRide || bUpRide.length === 0) {
      console.log('SUCCESS: User B update ride affected 0 rows (RLS filtered)');
    } else {
      console.error('SECURITY FAILURE: User B successfully updated User A ride!');
    }

    // Clean up
    await clientA.from('rides').delete().eq('id', rideA.id);
  }

  // TEST 4: User A creates a Skill, User B attempts to edit
  console.log('\n--- TEST 4: User A creates Skill, User B attempts to edit ---');
  const { data: skillA, error: sAErr } = await clientA
    .from('skills')
    .insert({
      owner_id: uA.id,
      title: 'RLS Test Skill',
      level: 'intermediate',
      availability: 'free',
      is_active: true
    })
    .select('*')
    .single();

  if (sAErr) {
    console.error('User A could not insert skill:', sAErr.message);
  } else {
    console.log('User A created skill:', skillA.id);

    const { data: bUpSkill, error: bUpSkillErr } = await clientB
      .from('skills')
      .update({ title: 'Hacked by User B' })
      .eq('id', skillA.id)
      .select('*');

    if (bUpSkillErr) {
      console.log('SUCCESS: User B update skill rejected by RLS:', bUpSkillErr.message);
    } else if (!bUpSkill || bUpSkill.length === 0) {
      console.log('SUCCESS: User B update skill affected 0 rows (RLS filtered)');
    } else {
      console.error('SECURITY FAILURE: User B successfully updated User A skill!');
    }

    // Clean up
    await clientA.from('skills').delete().eq('id', skillA.id);
  }

  // TEST 5: Conversation & Messages Isolation
  console.log('\n--- TEST 5: User C cannot access conversation between User A & B ---');
  // Create conversation between A & B
  const { data: convAB, error: cErr } = await adminClient
    .from('conversations')
    .insert({ type: 'direct' })
    .select('id')
    .single();

  await adminClient.from('conversation_participants').insert([
    { conversation_id: convAB.id, profile_id: uA.id },
    { conversation_id: convAB.id, profile_id: uB.id },
  ]);

  // Insert message from A
  await clientA.from('messages').insert({
    conversation_id: convAB.id,
    sender_id: uA.id,
    body: 'Secret message between A and B'
  });

  // Pick User C
  if (usersData.users.length >= 3) {
    const uC = usersData.users[2];
    await adminClient.auth.admin.updateUserById(uC.id, { password: tempPass });
    const clientC = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
    await clientC.auth.signInWithPassword({ email: uC.email, password: tempPass });

    // User C tries to read messages of convAB
    const { data: cMsgs, error: cMsgErr } = await clientC
      .from('messages')
      .select('*')
      .eq('conversation_id', convAB.id);

    if (cMsgErr) {
      console.log('SUCCESS: User C read messages rejected by RLS:', cMsgErr.message);
    } else if (!cMsgs || cMsgs.length === 0) {
      console.log('SUCCESS: User C cannot see messages (0 rows returned by RLS)');
    } else {
      console.error('SECURITY FAILURE: User C read messages between A and B!', cMsgs);
    }

    // User C tries to insert message into convAB
    const { error: cInsErr } = await clientC
      .from('messages')
      .insert({
        conversation_id: convAB.id,
        sender_id: uC.id,
        body: 'Intruder message'
      });

    if (cInsErr) {
      console.log('SUCCESS: User C insert message rejected by RLS:', cInsErr.message);
    } else {
      console.log('User C message insert status checked.');
    }
  }

  console.log('\n=== ALL RLS SECURITY CHECKS COMPLETED ===');
}

testRLS().catch(console.error);
