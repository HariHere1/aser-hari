import React from 'react';
import { createClientServer } from '@/lib/supabase-server';
import { ProfileSettingsForm } from './ProfileSettingsForm';

export const metadata = {
  title: 'Account Settings',
};

export default async function ProfileSettingsPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Student';
  const email = user?.email ?? '';
  const department = user?.user_metadata?.department ?? null;
  const year = user?.user_metadata?.year ?? null;
  const studentId = user?.user_metadata?.student_id ?? null;
  const bio = user?.user_metadata?.bio ?? null;

  // Detect OAuth users (Google etc.) — they can't change password
  const identities = user?.identities ?? [];
  const isOAuth = identities.some((id) => id.provider !== 'email');

  return (
    <ProfileSettingsForm
      fullName={displayName}
      email={email}
      department={department}
      year={year}
      studentId={studentId}
      bio={bio}
      isOAuth={isOAuth}
    />
  );
}
