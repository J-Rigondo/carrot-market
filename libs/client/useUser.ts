import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@prisma/client';

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  const { data, error } = useSWR<ProfileResponse>('/api/users/me');

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]); // whenever router change

  return { user: data?.profile, isLoading: !data && !error };
}
