import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createOrUpdate, deleteUser } from '@/lib/action/user.action'

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) 
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)
	
if (evt.type === 'user.created' || evt.type === 'user.updated' ) {
  const {id , first_name , last_name , email_addresses , username } = evt?.data
  console.log(evt.data);
  
try {
  await createOrUpdate(id , first_name , last_name , email_addresses , username)
  return new Response("user is created or updated",{status:200})
} catch (error) {
  console.log(`Error creating or updating user:${error}`);
  return new Response("Error occured",{status:400})
}
  
}
if (evt.type === 'user.delete') {
  const {id } = evt?.data
  try {
    await deleteUser(id)
    return new Response("user is deleted",{status:200})
  } catch (error) {
    console.log(`Error deleting user:${error}`);
    return new Response("Error occured",{status:400})
  }
}

  return new Response('', { status: 200 })
}