import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LetterForm from './LetterForm'

interface PageProps {
    params: Promise<{ mailboxKey: string }>
}

export default async function Page({ params }: PageProps) {
    const { mailboxKey } = await params
    const decodedKey = decodeURIComponent(mailboxKey)

    const supabase = await createClient()

    // Just check if mailbox exists to avoid 404 for valid mailboxes
    const { data: mailbox, error } = await supabase
        .from('mailboxes')
        .select('id')
        .eq('id', decodedKey)
        .single()

    if (error || !mailbox) {
        notFound()
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] right-[20%] w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <LetterForm mailboxKey={decodedKey} />

            <footer className="mt-12 text-center text-slate-600 text-sm">
                <Link href="/" className="hover:text-slate-400 transition-colors">
                    © Slow Letter Service
                </Link>
            </footer>
        </div>
    )
}
