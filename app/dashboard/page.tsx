import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowUpRight } from 'lucide-react'
import EditMailboxForm from './EditMailboxForm'

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/make')
    }

    // Get Mailbox
    const { data: mailbox } = await supabase
        .from('mailboxes')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (!mailbox) {
        redirect('/make')
    }

    // Get Letters (Show only if open_date is passed or null)
    const now = new Date().toISOString()
    const { data: letters } = await supabase
        .from('letters')
        .select('*')
        .eq('mailbox_id', mailbox.id)
        .or(`open_date.lte.${now},open_date.is.null`)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <EditMailboxForm currentAka={mailbox.aka} mailboxId={mailbox.id} />
                    </div>
                    <Link
                        href={`/${mailbox.id}`}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        target="_blank"
                    >
                        내 우체통 주소: (클릭하여 이동) <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="flex gap-8">
                    <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-white">{letters?.length || 0}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Arrived</div>
                    </div>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {letters?.map((letter) => (
                    <div key={letter.id} className="glass-card flex flex-col hover:bg-white/10 transition-all hover:-translate-y-1 duration-300">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                            <span className="font-bold text-white text-lg truncate flex-1 pr-2">{letter.sender_name}</span>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                                {new Date(letter.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-slate-300 line-clamp-6 text-sm leading-relaxed grow whitespace-pre-wrap">
                            {letter.content}
                        </p>
                    </div>
                ))}
                {letters?.length === 0 && (
                    <div className="col-span-full py-20 text-center rounded-2xl border border-dashed border-white/10 bg-white/5">
                        <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">아직 우체통이 비어있어요.</p>
                        <p className="text-slate-600 text-sm mt-2">친구들에게 내 우체통 링크를 공유해보세요!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
