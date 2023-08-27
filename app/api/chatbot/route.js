import { NextResponse } from 'next/server'

export const runtime = 'edge' // 'nodejs' is the default

export async function GET(request) {
  try {
    const params = new URL(request.url).searchParams
    const message = params.get('message')

    // const res = await fetch('https://www.botlibre.com/rest/json/chat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     messages: message,
    //     application: '3760202369780456668',
    //     instance: '48996468',
    //   }),
    // })

    // const data = await res.json()

    const res = await fetch(
      `https://api.wit.ai/message?v=20230826&q=${message}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer LDZ6VWKW7C24SBGUJCZZEUPOPEX4UVRS',
        },
      }
    )

    const data = await res.json()

    return NextResponse.json(
      {
        body: data,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    if (error.response) {
      return NextResponse.json(
        {
          body: error.response.data,
        },
        {
          status: 500,
        }
      )
    } else {
      return NextResponse.json(
        {
          body: error.message,
        },
        {
          status: 500,
        }
      )
    }
  }
}
