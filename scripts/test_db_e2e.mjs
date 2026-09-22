import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tduigjbrpkibnysdewhj.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdWlnamJycGtpYm55c2Rld2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA0OTQzNSwiZXhwIjoyMTA1NjI1NDM1fQ.UDD42pwPhUvLI30DM2yijWyxhPbtnXVYwViwR-YwhsE';

const adminClient = createClient(SUPABASE_URL, SERVICE_KEY);

async function testE2E() {
  console.log('=== TEST 1: CATEGORIES & PROFILES ===');
  const { data: categories } = await adminClient.from('categories').select('*').limit(1);
  const { data: profiles } = await adminClient.from('profiles').select('*').limit(2);
  
  const userA = profiles[0];
  const userB = profiles[1];
  const cat = categories?.[0];
  console.log(`User A: ${userA.id} (${userA.full_name})`);
  console.log(`User B: ${userB.id} (${userB.full_name})`);

  // Storage Public URL
  const { data: { publicUrl: resImgUrl } } = adminClient.storage.from('resource-images').getPublicUrl('test-res.jpg');
  const { data: { publicUrl: needImgUrl } } = adminClient.storage.from('need-images').getPublicUrl('test-need.jpg');

  console.log('\n=== TEST 3: RESOURCE CREATION ===');
  const { data: resource, error: rErr } = await adminClient
    .from('resources')
    .insert({
      owner_id: userA.id,
      title: 'Arduino Uno R3 Starter Kit',
      description: 'Original Arduino Uno with breadboard, sensors, and jumper wires. Perfect for IoT lab.',
      category_id: cat?.id || null,
      condition: 'like_new', // enum: new, like_new, good, used, needs_repair
      method: 'sell',        // enum: sell, rent, borrow, free, exchange
      price: 350,
      price_unit: 'total',
      location: 'Campus Hostel Block B',
      image_urls: [resImgUrl],
      status: 'active'       // enum: active, reserved, completed, expired, removed
    })
    .select('*')
    .single();

  if (rErr) console.error('Resource insert ERROR:', rErr);
  else console.log('Resource created successfully! ID:', resource.id, 'Title:', resource.title);

  console.log('\n=== TEST 4: NEED CREATION ===');
  const { data: need, error: nErr } = await adminClient
    .from('needs')
    .insert({
      poster_id: userA.id,
      title: 'Engineering Mathematics - 3 (B.S. Grewal)',
      description: 'Need B.S. Grewal Higher Engineering Mathematics 44th Edition for semester exams.',
      category_id: cat?.id || null,
      deadline: '2026-10-15',
      duration: '1 month',
      budget_min: 200,
      budget_max: 400,
      location: 'Central Library',
      image_url: needImgUrl,
      status: 'open'        // enum: open, matching, accepted, completed, expired, cancelled
    })
    .select('*')
    .single();

  if (nErr) console.error('Need insert ERROR:', nErr);
  else console.log('Need created successfully! ID:', need.id, 'Title:', need.title);

  console.log('\n=== TEST 5: RIDE CREATION ===');
  const { data: ride, error: rideErr } = await adminClient
    .from('rides')
    .insert({
      creator_id: userA.id,
      from_location: 'College Main Gate',
      to_location: 'Central Railway Station',
      ride_date: '2026-09-25',
      ride_time: '17:30',
      total_seats: 3,
      available_seats: 3,
      vehicle_type: 'car',   // enum: car, bike, auto, bus, other
      estimated_cost: 150,
      notes: 'Leaving right after class. AC on. Can split fuel.',
      status: 'active'       // enum: active, full, completed, cancelled
    })
    .select('*')
    .single();

  if (rideErr) console.error('Ride insert ERROR:', rideErr);
  else console.log('Ride created successfully! ID:', ride.id, 'From:', ride.from_location, 'To:', ride.to_location);

  console.log('\n=== TEST 6: SKILL CREATION ===');
  const { data: skill, error: sErr } = await adminClient
    .from('skills')
    .insert({
      owner_id: userA.id,
      title: 'Python & Data Structures Tutoring',
      description: 'Can help 1st/2nd years master Python, OOP, and LeetCode problems for placements.',
      category_id: cat?.id || null,
      level: 'expert',       // enum: beginner, intermediate, advanced, expert
      availability: 'paid',  // enum: free, paid, exchange
      rate: 100,
      rate_unit: 'per_hour',
      is_active: true
    })
    .select('*')
    .single();

  if (sErr) console.error('Skill insert ERROR:', sErr);
  else console.log('Skill created successfully! ID:', skill.id, 'Title:', skill.title);

  console.log('\n=== TEST 7: CHAT CONVERSATION & PARTICIPANTS & MESSAGES ===');
  // Create conversation for resource
  const { data: conv, error: convErr } = await adminClient
    .from('conversations')
    .insert({
      resource_id: resource ? resource.id : null,
      type: 'resource_request' // enum: resource_request, need_response, ride, skill_request, direct
    })
    .select('*')
    .single();

  if (convErr) {
    console.error('Conversation insert ERROR:', convErr);
  } else {
    console.log('Conversation created! ID:', conv.id);

    // Insert participants
    const { error: partErr } = await adminClient
      .from('conversation_participants')
      .insert([
        { conversation_id: conv.id, profile_id: userA.id },
        { conversation_id: conv.id, profile_id: userB.id }
      ]);
    if (partErr) console.error('Participants insert ERROR:', partErr);
    else console.log('Participants added successfully!');

    // Insert message
    const { data: msg, error: msgErr } = await adminClient
      .from('messages')
      .insert({
        conversation_id: conv.id,
        sender_id: userB.id,
        body: 'Hey! Is this Arduino Uno kit still available? I need it for our robotics project.'
      })
      .select('*')
      .single();

    if (msgErr) console.error('Message insert ERROR:', msgErr);
    else console.log('Message inserted! ID:', msg.id, 'Body:', msg.body);

    // Update last_message_at
    await adminClient
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conv.id);
    console.log('last_message_at updated successfully!');
  }
}

testE2E().catch(console.error);
