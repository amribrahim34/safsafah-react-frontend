import { NextResponse } from 'next/server';
import { env } from '@/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/home/brands`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
      return NextResponse.json([], { status: 200 });
    }

    const data = await response.json();
    const brands = Array.isArray(data) ? data : (data.data || []);
    
    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json([], { status: 200 });
  }
}
