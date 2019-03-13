/**
 * Created by vjtc0n on 3/28/17.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import I18n from 'redux-i18n'
import I18nTheme from 'redux-theme-switchable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AgGridReact } from 'ag-grid-react';

import { translations } from '../../../src/translations/translations'
import { themes } from '../../../src/themes/themes'

import ActiveCell from '../../../src/Modules/UserManagementPage/UI/React/components/ActiveCell'
import CreateUserComponent from '../../../src/Modules/UserManagementPage/UI/React/components/CreateUserComponent'
import {
  UserManagementPage
} from '../../../src/Modules/UserManagementPage/UI/React/containers/UserManagementPage'
import configureStore from '../../../src/store/configureStore';

const store = configureStore();
const client = new ApolloClient();
injectTapEventPlugin();


const data = {
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

const rowData = [
  {
    $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
    $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
    address: "QE",
    loginName: "khanhpg@gmail.com",
    phone: "0",
    roleGroupId: "2",
    status: 1,
    userId: "20",
    userName: "KhanhABCDHGE",
    uuid: "da73dc90137f11e7913c13138a0e0b6f"
  }
]

const rowData2 = [
  {
    $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
    $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
    address: "QE",
    loginName: "khanhpg@gmail.com",
    phone: "0",
    roleGroupId: "2",
    status: 1,
    userId: "20",
    userName: "KhanhABCDHGE",
    uuid: "da73dc90137f11e7913c13138a0e0b6f"
  }
]

const UserManagement = new UserManagementPage({
  
})

const ActiveCellComponent = new ActiveCell({
  colDef: {
    cellRendererParams: {
      updateUser: (userInfo) => {UserManagement.state.rowData[0] = userInfo}
    }
  }
})

const CreateUser = new CreateUserComponent({
  createUser: (userInfo) => { UserManagement.state.rowData.push(userInfo) }
})

describe('Testing ActiveCell Component', () => {
  test('Test ActiveCell component', () => {
    const component = renderer.create(
      <MuiThemeProvider>
        <ApolloProvider store={store} client={client}>
          <I18nTheme themes={themes}>
            <I18n translations={translations}>
              <ActiveCell data={data}/>
            </I18n>
          </I18nTheme>
        </ApolloProvider>
      </MuiThemeProvider>
    )
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    
    //console.log(tree.children[2].props.onClick)
  
    tree.children[2].props.onClick()
    tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  })
  
  test('Test CreateUser component', () => {
    const component = renderer.create(
      <MuiThemeProvider>
        <ApolloProvider store={store} client={client}>
          <I18nTheme themes={themes}>
            <I18n translations={translations}>
              <CreateUserComponent />
            </I18n>
          </I18nTheme>
        </ApolloProvider>
      </MuiThemeProvider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it('Testing onSubmitUser()', () => {
    UserManagement.state.rowData = rowData
    ActiveCellComponent.setState = () => null
    ActiveCellComponent.state.userInfo = data
    ActiveCellComponent.onSubmitUser()
    expect(UserManagement.state.rowData).toEqual([
      {
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
    ])
  })
  
  it('Testing onSubmitCreateUser()', () => {
    UserManagement.state.rowData = rowData2
    CreateUser.setState = () => null
    CreateUser.state.userInfo = data
    CreateUser.onSubmitCreateUser()
    expect(UserManagement.state.rowData).toEqual([
      {
        $id: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
        $key: "da73dc90137f11e7913c13138a0e0b6f|20|khanhpg@gmail.com|KhanhABCDHGE|1",
        address: "QE",
        loginName: "khanhpg@gmail.com",
        phone: "0",
        roleGroupId: "2",
        status: 1,
        userId: "20",
        userName: "KhanhABCDHGE",
        uuid: "da73dc90137f11e7913c13138a0e0b6f"
      },
      {
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
    ])
  })
  
  it('Testing onFormPress()', () => {
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.modalOpen = true}
    ActiveCellComponent.onFormPress()
    expect(ActiveCellComponent.state.modalOpen).toEqual(true)
  })
  
  it('Testing handleClose()', () => {
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.modalOpen = false}
    ActiveCellComponent.handleClose()
    expect(ActiveCellComponent.state.modalOpen).toEqual(false)
  })
  
  it('Testing handleChange()', () => {
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.roleGroupId = "2"}
    ActiveCellComponent.handleChange({}, 1, 2)
    expect(ActiveCellComponent.state.userInfo.roleGroupId).toEqual("2")
  })
  
  it('Testing onTextChange(username)', () => {
    const event = {
      target: {
        id: "username"
      }
    }
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.userId = "30"}
    ActiveCellComponent.onTextChange(event, "30")
    expect(ActiveCellComponent.state.userInfo.userId).toEqual("30")
  })
  
  it('Testing onTextChange(fullName)', () => {
    const event = {
      target: {
        id: "fullName"
      }
    }
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.userName = "30"}
    ActiveCellComponent.onTextChange(event, "30")
    expect(ActiveCellComponent.state.userInfo.userName).toEqual("30")
  })
  
  it('Testing onTextChange(company)', () => {
    const event = {
      target: {
        id: "company"
      }
    }
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.address = "30"}
    ActiveCellComponent.onTextChange(event, "30")
    expect(ActiveCellComponent.state.userInfo.address).toEqual("30")
  })
  
  it('Testing onTextChange(email)', () => {
    const event = {
      target: {
        id: "email"
      }
    }
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.loginName = "30"}
    ActiveCellComponent.onTextChange(event, "30")
    // Should validate email here
    expect(ActiveCellComponent.state.userInfo.loginName).toEqual("30")
  })
  
  it('Testing onTextChange(phoneNumber)', () => {
    const event = {
      target: {
        id: "phoneNumber"
      }
    }
    ActiveCellComponent.setState = () => {ActiveCellComponent.state.userInfo.phone = "30"}
    ActiveCellComponent.onTextChange(event, "30")
    expect(ActiveCellComponent.state.userInfo.phone).toEqual("30")
  })
  
})

describe('Testing CreateUser Component', () => {
  it('Testing onFormPress()', () => {
    CreateUser.setState = () => {CreateUser.state.modalOpen = true}
    CreateUser.onFormPress()
    expect(CreateUser.state.modalOpen).toEqual(true)
  })
  
  it('Testing handleClose()', () => {
    CreateUser.setState = () => {CreateUser.state.modalOpen = false}
    CreateUser.handleClose()
    expect(CreateUser.state.modalOpen).toEqual(false)
  })
  
  it('Testing handleChange()', () => {
    CreateUser.setState = () => {CreateUser.state.userInfo.roleGroupId = "2"}
    CreateUser.handleChange({}, 1, 2)
    expect(CreateUser.state.userInfo.roleGroupId).toEqual("2")
  })
  
  it('Testing onTextChange(username)', () => {
    const event = {
      target: {
        id: "username"
      }
    }
    CreateUser.setState = () => {CreateUser.state.userInfo.userId = "30"}
    CreateUser.onTextChange(event, "30")
    expect(CreateUser.state.userInfo.userId).toEqual("30")
  })
  
  it('Testing onTextChange(fullName)', () => {
    const event = {
      target: {
        id: "fullName"
      }
    }
    CreateUser.setState = () => {CreateUser.state.userInfo.userName = "30"}
    CreateUser.onTextChange(event, "30")
    expect(CreateUser.state.userInfo.userName).toEqual("30")
  })
  
  it('Testing onTextChange(company)', () => {
    const event = {
      target: {
        id: "company"
      }
    }
    CreateUser.setState = () => {CreateUser.state.userInfo.address = "30"}
    CreateUser.onTextChange(event, "30")
    expect(CreateUser.state.userInfo.address).toEqual("30")
  })
  
  it('Testing onTextChange(email)', () => {
    const event = {
      target: {
        id: "email"
      }
    }
    CreateUser.setState = () => {CreateUser.state.userInfo.loginName = "30"}
    CreateUser.onTextChange(event, "30")
    // Should validate email here
    expect(CreateUser.state.userInfo.loginName).toEqual("30")
  })
  
  it('Testing onTextChange(phoneNumber)', () => {
    const event = {
      target: {
        id: "phoneNumber"
      }
    }
    CreateUser.setState = () => {CreateUser.state.userInfo.phone = "30"}
    CreateUser.onTextChange(event, "30")
    expect(CreateUser.state.userInfo.phone).toEqual("30")
  })
})
