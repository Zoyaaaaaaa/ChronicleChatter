import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(req: NextRequest) {
  const { characterName, userMessage } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are now talking to ${characterName}.Reply as ${characterName}`,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 150,
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating answer:', error);
    return NextResponse.json({ error: 'Failed to generate answer.' }, { status: 500 });
  }
}
