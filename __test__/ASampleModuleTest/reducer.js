/**
 * Created by vjtc0n on 3/28/17.
 */
import * as UserActions from '../../../src/Modules/UserManagementPage/actions/user'

import user from '../../../src/Modules/UserManagementPage/reducers/user'

const INITIAL_STATE = {
  users: {}
}

const user1 = {
  $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
  $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
  address: "QE",
  loginName: "khanhpg@gmail.com",
  phone: "123123",
  roleGroupId: "2",
  status: 1,
  userId: "20",
  userName: "KhanhABCDHGE",
  uuid: "da73dc90137f11e7913c13138a0e0b6f"
}

const user2 = {
  $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
  $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
  address: "QE",
  loginName: "khanhpg@gmail.com",
  phone: "123123",
  roleGroupId: "2",
  status: 1,
  userId: "25",
  userName: "KhanhABCDHGE",
  uuid: "da73dc90137f11e7913c13138a0e0b6f"
}

const listUserInfo = [
  user1,
  user2
]

const CURRENT_STATE = {
  users: {
    listUserInfo: listUserInfo
  }
}

describe('Testing User Reducer', () => {
  it('Testing Get_USERS', () => {
    const state = user(INITIAL_STATE, UserActions.getUsers(() => {}));
    expect(state.users).toEqual({});
  })
  
  it('Testing REPLACE_USERS', () => {
    const state = user(INITIAL_STATE, UserActions.replaceUsers(listUserInfo));
    expect(state.users).toEqual(listUserInfo);
  })
  
  it('Testing UPDATE_USER', () => {
    const state = user(INITIAL_STATE, UserActions.updateUser({}));
    expect(state.users).toEqual({});
  })
  
  it('Testing UPDATE_USERS', () => {
    const state = user(INITIAL_STATE, UserActions.updateUsers({}));
    expect(state.users).toEqual({});
  })
  
  it('Testing REPLACE_USER', () => {
    const state = user(CURRENT_STATE, UserActions.replaceUser({
      $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
      $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
      address: "QE",
      loginName: "khanhpg@gmail.com",
      phone: "1",
      roleGroupId: "2",
      status: 1,
      userId: "20",
      userName: "KhanhABCDHGE",
      uuid: "da73dc90137f11e7913c13138a0e0b6f"
    }));
    expect(state.users.listUserInfo).toEqual([
        {$id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
          $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
          address: "QE",
          loginName: "khanhpg@gmail.com",
          phone: "1",
          roleGroupId: "2",
          status: 1,
          userId: "20",
          userName: "KhanhABCDHGE",
          uuid: "da73dc90137f11e7913c13138a0e0b6f"},
        {$id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
          $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
          address: "QE",
          loginName: "khanhpg@gmail.com",
          phone: "123123",
          roleGroupId: "2",
          status: 1,
          userId: "25",
          userName: "KhanhABCDHGE",
          uuid: "da73dc90137f11e7913c13138a0e0b6f"}
      ]
    );
  })
  
  it('Testing CREATE_USER', () => {
    const state = user(INITIAL_STATE, UserActions.createUser({}));
    expect(state.users).toEqual({});
  })
  
  it('Testing ADD_USER_TO_REDUX', () => {
    const state = user(INITIAL_STATE, UserActions.addUserToRedux({}));
    expect(state.users).toEqual({});
  })
  
  it('Testing REPLACE_USER_TO_REDUX', () => {
    const state = user(CURRENT_STATE, UserActions.replaceUserToRedux({
      $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
      $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
      address: "QE",
      loginName: "khanhpg@gmail.com",
      phone: "98765432",
      roleGroupId: "2",
      status: 1,
      userId: "30",
      userName: "KhanhABCDHGE",
      uuid: "da73dc90137f11e7913c13138a0e0b6f"
    }));
    expect(state.users.listUserInfo).toEqual([
      user1,
      user2,
      {
        $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
        $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
        address: "QE",
        loginName: "khanhpg@gmail.com",
        phone: "98765432",
        roleGroupId: "2",
        status: 1,
        userId: "30",
        userName: "KhanhABCDHGE",
        uuid: "da73dc90137f11e7913c13138a0e0b6f"
      }
    ]);
  })
  
})

