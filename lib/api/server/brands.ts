

import { env } from '@/config';
import type { HomeBrand } from '@/types';


export async function getBrandsServer(): Promise<HomeBrand[]> {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/home/brands`,
      {
        next: {
          revalidate: 10800, // 3 hours in seconds (3 * 60 * 60)
          tags: ['brands'], // Cache tag for on-demand revalidation
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Log error but return empty array to prevent page crash
      console.error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    
    // Handle both direct array response and wrapped response
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error fetching brands:', error);
    // Return empty array on error to prevent page crash
    return [];
  }
}


