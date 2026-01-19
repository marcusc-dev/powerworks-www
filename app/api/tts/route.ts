'use server';

import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

// Initialize the client with credentials from environment
let ttsClient: TextToSpeechClient | null = null;

function getClient(): TextToSpeechClient {
  if (!ttsClient) {
    const credentials = process.env.GOOGLE_CLOUD_CREDENTIALS;

    if (credentials) {
      // Parse JSON credentials from environment variable
      const parsedCredentials = JSON.parse(credentials);
      ttsClient = new TextToSpeechClient({
        credentials: parsedCredentials,
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Use file-based credentials
      ttsClient = new TextToSpeechClient();
    } else {
      throw new Error('Google Cloud credentials not configured');
    }
  }
  return ttsClient;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Limit text length to prevent abuse
    if (text.length > 2000) {
      return NextResponse.json(
        { error: 'Text too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    const client = getClient();

    // Use Neural2 British English male voice for Glenn
    const ttsRequest: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text },
      voice: {
        languageCode: 'en-GB',
        name: 'en-GB-Neural2-B', // British male Neural2 voice
        ssmlGender: 'MALE' as const,
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.95, // Slightly slower for clarity
        pitch: 0, // Natural pitch
        volumeGainDb: 0,
      },
    };

    const [response] = await client.synthesizeSpeech(ttsRequest);

    if (!response.audioContent) {
      return NextResponse.json(
        { error: 'Failed to generate audio' },
        { status: 500 }
      );
    }

    // Return audio as base64
    const audioBase64 = Buffer.from(response.audioContent as Uint8Array).toString('base64');

    return NextResponse.json({
      audio: audioBase64,
      contentType: 'audio/mpeg',
    });
  } catch (error) {
    console.error('TTS API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Check if it's a credentials error
    if (errorMessage.includes('credentials') || errorMessage.includes('GOOGLE')) {
      return NextResponse.json(
        { error: 'TTS not configured - using browser fallback', fallback: true },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to synthesize speech', fallback: true },
      { status: 500 }
    );
  }
}
