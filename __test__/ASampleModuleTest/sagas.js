/**
 * Created by vjtc0n on 3/28/17.
 */
import { put } from 'redux-saga/effects';

import { requestCreateUserAsync, requestGetUsersAsync, requestUpdateUsers, requestAddUserToRedux, requestUpdateUserAsync } from '../../../src/Modules/UserManagementPage/sagas/user'
import * as UserActions from '../../../src/Modules/UserManagementPage/actions/user'
import * as GlobalActions from '../../../src/actions/common'
import {
  CREATE_USER,
  GET_USERS,
  REPLACE_USERS,
  UPDATE_USER
} from '../../../src/Modules/UserManagementPage/constants/constants'

const stepper = fn => mock => fn.next(mock).value;

const data = {
  userId: '25',
  loginName: 'khanh43121@gmail.com',
  userName: 'Khanh Pham',
  address: '',
  phone: '',
  roleGroupId: '2'
}


describe('UserManagementPage Saga Testing', () => {
  it('Get a list of user flow in saga isTimeout=true', () => {
    let requestKey = 'getUsers'
   
    const step = stepper(requestGetUsersAsync({
      type: GET_USERS,
      args: [
        () => {}
      ]
    }));
    const params = {
      data: data,
      isTimeout: true,
      cancelRet: 'cancelRet',
    }
  
    // Request Pending
    expect(step()).toEqual(
      put(GlobalActions.markRequestPending(requestKey))
    )
    // Request Race
    step();
    
    // Request Time out
    const stepResponse = step(params);
    expect(stepResponse).toEqual(
      put(GlobalActions.markRequestFailed(new Error('Api method is timeout after 10000 ms!!!'), requestKey))
    )
    
  })
  
  it('Get a list of user flow in saga isTimeout=false', () => {
    let requestKey = 'getUsers'
    
    const step = stepper(requestGetUsersAsync({
      type: GET_USERS,
      args: [
        () => {}
      ]
    }));
    const params = {
      data: data,
      isTimeout: false
    }
    
    // Request Pending
    expect(step()).toEqual(
      put(GlobalActions.markRequestPending(requestKey))
    )
    // Request Race
    step();
    
    // Request Replace Users
    expect(step(params)).toEqual(
      put(UserActions.replaceUsers(data))
    )
    
    // Request Invoke Callback
    expect(step(() => {})).toEqual(
      put(GlobalActions.invokeCallback(() => {}))
    )
    
    // Request Success
    expect(step()).toEqual(
      put(GlobalActions.markRequestSuccess(requestKey))
    )
    
  })
  
  it('Replace a User after updating it', () => {
    
    const step = stepper(requestUpdateUsers({
      args: [
        data
      ]
    }));
    
    // Replace updated user
    expect(step()).toEqual(
      put(UserActions.replaceUser(data))
    )
  })
  
  it('Add a User to Redux after creating it', () => {
    
    const step = stepper(requestAddUserToRedux({
      args: [
        data
      ]
    }));
    
    // Replace updated user
    expect(step()).toEqual(
      put(UserActions.replaceUserToRedux(data))
    )
  })
  
  it('Update a new user flow in saga isTimeout=false', () => {
    let requestKey = 'updateUser'
    const params = {
      data: data,
      isTimeout: false
    }
    
    const step = stepper(requestUpdateUserAsync({
      type: UPDATE_USER,
      args: [
        params,
        () => {}
      ]
    }));
    
    // Request Pending
    expect(step()).toEqual(
      put(GlobalActions.markRequestPending(requestKey))
    )
    // Request Race
    step();
    
    // Request Invoke Callback
    expect(step(() => {})).toEqual(
      put(GlobalActions.invokeCallback(() => {}))
    )
    
    // Request Success
    expect(step()).toEqual(
      put(GlobalActions.markRequestSuccess(requestKey))
    )
    
  })
  
  it('Create a new user flow in saga isTimeout=false', () => {
    let requestKey = 'createUser'
    const params = {
      data: data,
      isTimeout: false
    }
    
    const step = stepper(requestCreateUserAsync({
      type: CREATE_USER,
      args: [
        params,
        () => {}
      ]
    }));
    
    // Request Pending
    expect(step()).toEqual(
      put(GlobalActions.markRequestPending(requestKey))
    )
    // Request Race
    step();
    
    // Request Invoke Callback
    expect(step(() => {})).toEqual(
      put(GlobalActions.invokeCallback(() => {}))
    )
    
    // Request Success
    expect(step()).toEqual(
      put(GlobalActions.markRequestSuccess(requestKey))
    )
    
  })
  
})
