'use server';

import { revalidatePath } from 'next/cache';
import { createClientServer, createClientAdmin } from '@/lib/supabase-server';
import { isAdmin } from '@/lib/admin';

export async function toggleVerifyStudent(profileId: string, currentStatus: boolean) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    return { success: false, error: 'Unauthorized: Admin access required.' };
  }

  const adminClient = createClientAdmin();
  const { error } = await adminClient
    .from('profiles')
    .update({ is_verified: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', profileId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/dashboard');
  return { success: true, error: null };
}

export async function deleteListingAdmin(type: 'resource' | 'need' | 'ride' | 'skill', id: string) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    return { success: false, error: 'Unauthorized: Admin access required.' };
  }

  const tableMap = {
    resource: 'resources',
    need: 'needs',
    ride: 'rides',
    skill: 'skills',
  };

  const tableName = tableMap[type];
  if (!tableName) return { success: false, error: 'Invalid listing type.' };

  const adminClient = createClientAdmin();
  const { error } = await adminClient
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath(`/dashboard/${tableName}`);
  return { success: true, error: null };
}

export async function resolveReportAdmin(reportId: string, status: 'resolved' | 'dismissed', adminNotes?: string) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    return { success: false, error: 'Unauthorized: Admin access required.' };
  }

  const adminClient = createClientAdmin();
  const { error } = await adminClient
    .from('reports')
    .update({
      status,
      admin_notes: adminNotes || null,
      resolved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/reports');
  revalidatePath('/admin/dashboard');
  return { success: true, error: null };
}

export async function sendAnnouncement(payload: {
  title: string;
  body: string;
  cta_label?: string;
  cta_url?: string;
  emoji?: string;
}) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    return { success: false, error: 'Unauthorized: Admin access required.' };
  }

  const adminClient = createClientAdmin();

  // Deactivate all existing announcements first (only one active at a time)
  await adminClient
    .from('announcements')
    .update({ is_active: false })
    .eq('is_active', true);

  // Insert new active announcement
  const { error } = await adminClient.from('announcements').insert({
    title: payload.title.trim(),
    body: payload.body.trim(),
    cta_label: payload.cta_label?.trim() || null,
    cta_url: payload.cta_url?.trim() || null,
    emoji: payload.emoji?.trim() || null,
    is_active: true,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/admin/dashboard');
  return { success: true, error: null };
}

export async function deactivateAnnouncement() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    return { success: false, error: 'Unauthorized: Admin access required.' };
  }

  const adminClient = createClientAdmin();
  const { error } = await adminClient
    .from('announcements')
    .update({ is_active: false })
    .eq('is_active', true);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/admin/dashboard');
  return { success: true, error: null };
}
