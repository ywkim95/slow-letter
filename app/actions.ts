'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function loginWithGoogle() {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function createMailbox(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const aka = formData.get('aka') as string
    const notificationEmail = formData.get('notificationEmail') as string

    if (!aka || aka.length < 2) {
        return { error: '우체통 이름은 2자 이상이어야 합니다.' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: '로그인이 필요합니다.' }
    }

    // 1. Ensure user profile exists (if needed, or assume triggers)
    const { error: profileError } = await supabase.from('users').upsert({
        id: user.id,
        updated_at: new Date().toISOString()
    }, { onConflict: 'id' }).select()

    // 2. Insert Mailbox
    const { error } = await supabase.from('mailboxes').insert({
        user_id: user.id,
        aka,
        notification_email: notificationEmail || null,
        email_notification_enabled: !!notificationEmail && notificationEmail.length > 0
    })

    if (error) {
        console.log(error)
        if (error.code === '23505') {
            if (error.message.includes('aka')) return { error: '이미 사용 중인 우체통 이름입니다.' }
            if (error.message.includes('user_id')) return { error: '이미 우체통을 가지고 계십니다.' }
        }
        return { error: '우체통 생성 중 오류가 발생했습니다.' }
    }

    // Use encodeURIComponent for the key part to handle Korean characters safely in headers
    redirect(`/${encodeURIComponent(aka)}`)
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}

export async function updateMailboxAka(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const newAka = formData.get('aka') as string
    const mailboxId = formData.get('mailboxId') as string

    if (!newAka || newAka.length < 2) {
        return { error: '우체통 이름은 2자 이상이어야 합니다.' }
    }

    // Check availability
    const { data: existing } = await supabase
        .from('mailboxes')
        .select('id')
        .eq('aka', newAka)
        .neq('id', mailboxId) // Exclude self
        .single()

    if (existing) {
        return { error: '이미 사용 중인 이름입니다.' }
    }

    const { error } = await supabase
        .from('mailboxes')
        .update({ aka: newAka })
        .eq('id', mailboxId)

    if (error) {
        return { error: '이름 변경에 실패했습니다.' }
    }

    revalidatePath('/dashboard')
    revalidatePath(`/${newAka}`)

    return { success: true, message: '우체통 이름이 변경되었습니다.', newAka }
}

export async function sendGeneralLetter(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const senderName = formData.get('senderName') as string
    const content = formData.get('content') as string
    const receiverEmail = formData.get('receiverEmail') as string
    const openDate = formData.get('openDate') as string

    if (!senderName || !content || !receiverEmail) {
        return { error: '이름, 받는 사람 이메일, 내용을 모두 입력해주세요.' }
    }

    // 1. Try to find a mailbox with this email (Auto-linking)
    const { data: existingMailbox } = await supabase
        .from('mailboxes')
        .select('id')
        .eq('notification_email', receiverEmail)
        .single()

    // Strict Validation: If no mailbox found, Do NOT send.
    if (!existingMailbox) {
        return { error: '해당 이메일로 개설된 우체통을 찾을 수 없습니다.' }
    }

    const targetMailboxId = existingMailbox.id

    const isPublic = formData.get('isPublic') === 'on'

    // 2. Insert Letter
    const { error } = await supabase.from('letters').insert({
        mailbox_id: targetMailboxId,
        sender_name: senderName,
        content,
        // sender_email removed
        receiver_email: receiverEmail,
        open_date: openDate || null,
        is_public: isPublic,
    })

    if (error) {
        console.error(error)
        return { error: '편지 전송에 실패했습니다.' }
    }

    // Email Notification Logic (To Receiver)
    try {
        console.log(`[Email Action - General] 편지 도착 알림 발송 -> 받는 사람: ${receiverEmail}, 보낸 사람: ${senderName}`)
        // Actual email sending logic would go here
    } catch (e) {
        console.error("Email notification failed:", e)
    }

    return { success: true, message: '편지가 성공적으로 전송되었습니다.' }
}

export async function sendLetter(mailboxKey: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const senderName = formData.get('senderName') as string
    const content = formData.get('content') as string
    const receiverEmail = formData.get('receiverEmail') as string
    const openDate = formData.get('openDate') as string

    if (!senderName || !content || !receiverEmail) {
        return { error: '이름, 받는 사람 이메일, 내용을 모두 입력해주세요.' }
    }

    // Find Mailbox
    const { data: mailbox, error: mbError } = await supabase
        .from('mailboxes')
        .select('id')
        .eq('aka', mailboxKey)
        .single()

    if (mbError || !mailbox) {
        return { error: '존재하지 않는 우체통입니다.' }
    }

    const isPublic = formData.get('isPublic') === 'on'

    // Insert Letter
    const { error } = await supabase.from('letters').insert({
        mailbox_id: mailbox.id,
        sender_name: senderName,
        content,
        // sender_email removed
        receiver_email: receiverEmail,
        open_date: openDate || null,
        is_public: isPublic,
    })

    if (error) {
        console.error(error)
        return { error: '편지 저장에 실패했습니다.' }
    }

    // Email Notification Logic (To Receiver)
    try {
        console.log(`[Email Action] 편지 도착 알림 발송 -> 받는 사람: ${receiverEmail}, 보낸 사람: ${senderName}`)
        // Actual email sending logic would go here (e.g. Resend, Nodemailer)
    } catch (e) {
        console.error("Email notification failed:", e)
    }

    // Revalidate
    revalidatePath(`/${mailboxKey}`)

    return { success: true, message: '편지가 성공적으로 저장되었습니다.' }
}
