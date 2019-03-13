/**
 * Created by vjtc0n on 4/5/17.
 */
import 'isomorphic-fetch'

import * as API from '../../../src/Modules/UserManagementPage/api/user-api'
import { fetchJson } from '../../../src/backend/common'

jest.mock('isomorphic-fetch');

describe('Testing User-Api', () => {
  
  it('getUsers() failed', () => {
    
    const expected = { errorCode: 'NOT_FOUND'};
    const body = JSON.stringify(expected);
    const init = { status: 400, statusText: 'ERROR' };
    fetch.mockResponseOnce(body, init);
    
    return API.getUsers()
      .catch(error => expect(error).toEqual({
        status: 400,
        message: 'ERROR',
        errorCode: 'NOT_FOUND'
      }));
  })
  
  it('getUsers() success but response 204', () => {
    
    const expected = {};
    const body = JSON.stringify(expected);
    const init = { status: 204, statusText: 'OK' };
    fetch.mockResponseOnce(body, init);
    
    return API.getUsers()
      .then(actual => expect(actual).toEqual({}))
  })
  
  // Test once
  it('getUsers() success with partial url', () => {
    
    const expected = {};
    const body = JSON.stringify(expected);
    const init = { status: 200, statusText: 'OK' };
    fetch.mockResponseOnce(body, init);
    
    return fetchJson('/someUrl')
      .then(actual => expect(actual).toEqual({}))
  })
  
  it('getUsers() success with content', () => {
    
    const expected = { listUserInfo: []};
    const body = JSON.stringify(expected);
    const init = { status: 200, statusText: 'OK' };
    fetch.mockResponseOnce(body, init);
    
    return API.getUsers()
      .then(actual => expect(actual).toEqual(expected))
  })
  
  it('updateUser() success', () => {
    
    const updateUser = {}
    const expected = { errorCode: 'SUCCESS'};
    const body = JSON.stringify(expected);
    const init = { status: 200, statusText: 'OK' };
    fetch.mockResponseOnce(body, init);
    
    return API.updateUser(updateUser)
      .then(actual => expect(actual).toEqual(expected))
  })
  
  it('createUser() success', () => {
    
    const createUser = {}
    const expected = { errorCode: 'SUCCESS'};
    const body = JSON.stringify(expected);
    const init = { status: 200, statusText: 'OK' };
    fetch.mockResponseOnce(body, init);
    
    return API.createUser(createUser)
      .then(actual => expect(actual).toEqual(expected))
  })
})
