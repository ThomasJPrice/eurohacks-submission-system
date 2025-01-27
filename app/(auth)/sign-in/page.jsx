import LoginCard from '@/components/shared/LoginCard';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const supabase = await createClient()
  const {data: { user}} = await supabase.auth.getUser()

  if (user) redirect('/')

  return (
    <div className='flex flex-col items-center justify-center min-h-[100dvh] relative'>
      <div className='mx-2'>
        <LoginCard />
      </div>

      <Image priority fill src='/banner.png' alt='Banner' className='absolute top-0 left-0 h-screen w-screen object-cover -z-10' />
    </div>
  );
}
