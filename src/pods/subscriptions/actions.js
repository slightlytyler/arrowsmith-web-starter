import request from 'utils/request';
import stripe from 'stripe';
import { push } from 'react-router-redux';
import { mapKeys, snakeCase } from 'lodash';

const testAddress = {
  addressLine1: '301 S Harwood St.',
  addressLine2: '1102',
  city: 'Dallas',
  state: 'TX',
  zip: '75201',
};

const testCreditCard = {
  number: '4242424242424242',
  expMonth: 12,
  expYear: 2017,
  cvc: '123',
};

export const createSubscriptionFlow = (plan = 'GOALS_STANDARD', address = testAddress, creditCard = testCreditCard) => async (dispatch, getState) => {
  try {
    const { user } = getState();

    // Create stripe customer
    await request.post('stripe', 'customers', { userId: user.id });

    // Update user with address
    await request.put('user', `users/${user.id}`, { address });

    // Create credit card
    const token = await new Promise((resolve, reject) =>
      stripe.card.createToken(
        mapKeys(creditCard,
        (value, key) => snakeCase(key)
      ),
      (status, response) => {
        if (response.error) reject(response.error.message);
        else resolve(response.id);
      })
    );
    await request.post('stripe', `customers/${user.id}/cards`, { token });

    // Create Subscription
    await request.post('stripe', `customers/${user.id}/subscriptions`, { planId: plan });

    // Transition to dashboard
    dispatch(push('/projects'));
  } catch (error) {
    throw error;
  }
};

export const viewSubscriptionOptions = () => push('/start-subscription');
