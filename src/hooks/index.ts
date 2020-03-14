import { createTypedHooks } from 'easy-peasy';
import StoreModel from '../interfaces/StoreModel';

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions, useStoreDispatch, useStoreState } = typedHooks;
