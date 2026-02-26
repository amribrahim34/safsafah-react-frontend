/**
 * Custom hook for managing beauty questionnaire data
 * Handles fetching questionnaire options and submitting beauty profile
 */

import { useState, useEffect, useCallback } from 'react';
import { beautyProfileService } from '@/lib/api';

/**
 * Hook for fetching beauty questionnaire options
 * @returns {Object} Questionnaire data, loading state, and error
 */
export function useBeautyQuestionnaire() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionnaireOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const options = await beautyProfileService.getQuestionnaireOptions();
        setData(options);
      } catch (err) {
        setError(err.message || 'Failed to load questionnaire options');
        console.error('Error fetching questionnaire options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaireOptions();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for submitting beauty profile
 * @returns {Object} Submit function, loading state, error, and success state
 */
export function useBeautyProfileSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [beautyProfile, setBeautyProfile] = useState(null);

  const submitProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await beautyProfileService.createBeautyProfile(profileData);
      setBeautyProfile(result);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Failed to save beauty profile';
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

  return {
    submitProfile,
    loading,
    error,
    success,
    beautyProfile,
    reset,
  };
}

/**
 * Hook for fetching user's existing beauty profile
 * @returns {Object} Profile data, loading state, error, and refetch function
 */
export function useBeautyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await beautyProfileService.getBeautyProfile();
      setProfile(data);
    } catch (err) {
      // If profile doesn't exist, it's not an error
      if (err.statusCode === 404) {
        setProfile(null);
      } else {
        setError(err.message || 'Failed to load beauty profile');
        console.error('Error fetching beauty profile:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
}
