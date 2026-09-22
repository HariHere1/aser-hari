'use server';

import { revalidatePath } from 'next/cache';
import { createClientServer } from '@/lib/supabase-server';

export type UpdateProfileState = {
  success: boolean;
  error: string | null;
};

export async function updateProfile(
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const supabase = await createClientServer();

  const fullName = (formData.get('full_name') as string)?.trim();
  const department = (formData.get('department') as string)?.trim();
  const year = (formData.get('year') as string)?.trim();
  const studentId = (formData.get('student_id') as string)?.trim();
  const bio = (formData.get('bio') as string)?.trim();

  if (!fullName) {
    return { success: false, error: 'Full name is required.' };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      department: department || null,
      year: year || null,
      student_id: studentId || null,
      bio: bio || null,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/profile');
  return { success: true, error: null };
}

export async function updatePassword(
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const supabase = await createClientServer();

  const newPassword = formData.get('new_password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters.' };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
