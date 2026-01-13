import { createClient } from '@/utils/supabase/server'
import ClientHome from '@/components/ClientHome'

export default async function Home() {
  const supabase = await createClient()

  // Check Login Status
  const { data: { user } } = await supabase.auth.getUser()

  let hasMailbox = false
  let mailboxKey = null

  if (user) {
    const { data: mailbox } = await supabase
      .from('mailboxes')
      .select('aka')
      .eq('user_id', user.id)
      .single()
    if (mailbox) {
      hasMailbox = true
      mailboxKey = mailbox.aka
    }
  }

  return <ClientHome user={user} hasMailbox={hasMailbox} mailboxKey={mailboxKey} />
}
