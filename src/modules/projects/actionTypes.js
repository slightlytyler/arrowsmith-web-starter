import { createApiActionTypes } from 'api/helpers';
import { NAME } from './constants';

export const api = createApiActionTypes(NAME);

export const createRecord = {
  pending: `${NAME}/CREATE_RECORD/PENDING`,
  success: `${NAME}/CREATE_RECORD/SUCCESS`,
  failure: `${NAME}/CREATE_RECORD/FAILURE`,
};

export const updateRecord = {
  pending: `${NAME}/UPDATE_RECORD/PENDING`,
  success: `${NAME}/UPDATE_RECORD/SUCCESS`,
  failure: `${NAME}/UPDATE_RECORD/FAILURE`,
};

export const deleteRecord = {
  pending: `${NAME}/DELETE_RECORD/PENDING`,
  success: `${NAME}/DELETE_RECORD/SUCCESS`,
  failure: `${NAME}/DELETE_RECORD/FAILURE`,
};

export const fetchCollection = {
  pending: `${NAME}/FETCH_COLLECTION/PENDING`,
  success: `${NAME}/FETCH_COLLECTION/SUCCESS`,
  failure: `${NAME}/FETCH_COLLECTION/FAILURE`,
};
