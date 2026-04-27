import { useState, useEffect, useCallback } from 'react';
import { beautyProfileService } from '@/lib/api';
import type {
  BeautyQuestionnaireOptions,
  BeautyProfile,
  CreateBeautyProfileRequest,
} from '@/types/models/beauty-profile';

export function useBeautyQuestionnaire() {
  const [data, setData] = useState<BeautyQuestionnaireOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionnaireOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const options = await beautyProfileService.getQuestionnaireOptions();
        setData(options);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questionnaire options');
        console.error('Error fetching questionnaire options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaireOptions();
  }, []);

  return { data, loading, error };
}

export function useBeautyProfileSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [beautyProfile, setBeautyProfile] = useState<BeautyProfile | null>(null);

  const submitProfile = useCallback(async (profileData: CreateBeautyProfileRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await beautyProfileService.createBeautyProfile(profileData);
      setBeautyProfile(result);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save beauty profile';
      setError(errorMessage);
      console.error('Error submitting beauty profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setBeautyProfile(null);
  }, []);

  return { submitProfile, loading, error, success, beautyProfile, reset };
}

export function useBeautyProfile() {
  const [profile, setProfile] = useState<BeautyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await beautyProfileService.getBeautyProfile();
      setProfile(data);
    } catch (err) {
      if ((err as { statusCode?: number }).statusCode === 404) {
        setProfile(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load beauty profile');
        console.error('Error fetching beauty profile:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
