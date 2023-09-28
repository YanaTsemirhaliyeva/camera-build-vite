import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/basket" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Basket);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Basket);
  });

  it('shouldn\'t redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Index };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Index);
  });
});
