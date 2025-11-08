/**
 * Redux Typed Hooks
 *
 * Pre-typed versions of React-Redux hooks for use throughout the app.
 * These hooks should be used instead of plain `useDispatch` and `useSelector`.
 *
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Pre-typed useDispatch hook
 * Use throughout app instead of plain `useDispatch`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Pre-typed useSelector hook
 * Use throughout app instead of plain `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
