import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  console.log('router 처음에 un인가?', router);

  const { data, error } = useSWR('/api/users/me');

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]); // whenever router change

  return { user: data?.profile, isLoading: !data && !error };
}
