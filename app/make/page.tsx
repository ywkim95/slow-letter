import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import MakeForm from './MakeForm'
import LoginButton from '@/components/LoginButton'

export default async function Page() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-4 max-w-lg">
                    <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                        먼저 로그인이 필요해요
                    </h1>
                    <p className="text-slate-300 text-lg">
                        나만의 우체통을 만들고 관리하려면<br />로그인이 필요합니다.
                    </p>
                </div>
                <div className="w-full max-w-sm">
                    <div className="glass-card flex flex-col justify-center py-10 shadow-2xl">
                        <LoginButton />
                    </div>
                </div>
            </div>
        )
    }

    // Check if already has mailbox
    const { data: mailbox } = await supabase.from('mailboxes').select('id').eq('user_id', user.id).single()

    if (mailbox) {
        redirect(`/${mailbox.id}`)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-transparent to-black/20">
            <MakeForm />
        </div>
    )
}
