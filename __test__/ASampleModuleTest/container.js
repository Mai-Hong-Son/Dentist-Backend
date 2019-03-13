/**
 * Created by vjtc0n on 3/30/17.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import I18n from 'redux-i18n'
import I18nTheme from 'redux-theme-switchable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { LicenseManager } from 'ag-grid-enterprise/main';
import { render, shallow, mount } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';
import Dialog from 'material-ui/Dialog';
import "ag-grid-enterprise";

import { translations } from '../../../src/translations/translations'
import { themes } from '../../../src/themes/themes'

import * as UserActions from '../../../src/Modules/UserManagementPage/actions/user'
import ActiveCell from '../../../src/Modules/UserManagementPage/UI/React/components/ActiveCell'
import CreateUserComponent from '../../../src/Modules/UserManagementPage/UI/React/components/CreateUserComponent'
import {
  UserManagementPage,
  mapDispatchToProps,
  mapStateToProps
} from '../../../src/Modules/UserManagementPage/UI/React/containers/UserManagementPage'
import configureStore from '../../../src/store/configureStore';

LicenseManager.setLicenseKey('ag-Grid_Evaluation_License_Not_for_Production_100Devs24_May_2017__MTQ5NTU4MDQwMDAwMA==16be8f8f82a5e4b5fa39766944c69a32');

const store = configureStore();
const client = new ApolloClient();
injectTapEventPlugin();

jest.useFakeTimers();

var data = [
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
]

var listData = {
  listUserInfo: data
}

const user = {
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

const headerName = ['Username', 'Full Name', 'Company', 'Phone Number', 'Email', 'Permission', 'Status']

const UserManagementA = new UserManagementPage()
const UserManagement = new UserManagementPage({
  actions: {
    getUsers: (callback) => {
      UserManagement.state.rowData = data
      callback(listData)
    },
    createUser: (user, callback) => {
      callback(user)
    },
    addUserToRedux: (user) => {
      
    }
  }
})

describe('Testing UserManagementContainer', () => {
  it('Testing UserManagementContainer', () =>{
    console.log(UserManagementA.props.actions)
    const dom = mount(
      <MuiThemeProvider>
        <ApolloProvider store={store} client={client}>
          <I18nTheme themes={themes}>
            <I18n translations={translations}>
              <UserManagementPage actions={
                {getUsers: () => {}}
              }/>
            </I18n>
          </I18nTheme>
        </ApolloProvider>
      </MuiThemeProvider>
    )
    
    //console.log(dom.find(AgGridReact).node.gridOptions.columnDefs[6])
    
    expect(dom.find('.ag-material').length).toBe(1);
    expect(dom.find('.grid-container').length).toBe(1);
    expect(dom.find(AgGridReact).length).toBe(1);
    expect(dom.find(AgGridReact).node.gridOptions.columnDefs.length).toBe(7);
    expect(dom.find(CreateUserComponent).length).toBe(1);
    expect(dom.find(Dialog).length).toBe(2);
    expect(dom.find(ActiveCell).length).toBe(0); //ActiveCell belongs to a function in columnDefs
    expect(dom.find(AgGridReact).node.gridOptions.columnDefs[6].cellRendererFramework.name).toEqual('ActiveCell') //Check ActiveCell component
    for (let i = 0; i < dom.find(AgGridReact).node.gridOptions.columnDefs.length; i++) {
      expect(dom.find(AgGridReact).node.gridOptions.columnDefs[i].headerName).toEqual(headerName[i])
    }
  })
  
  it('Testing Update User in ActiveCell', () => {
    let listAction = {
      getUsers: () => {},
      updateUser: (user, callback) => { callback()},
      updateUsers: (user) => {}
    }
    
    const dom = mount(
      <MuiThemeProvider>
        <ApolloProvider store={store} client={client}>
          <I18nTheme themes={themes}>
            <I18n translations={translations}>
              <UserManagementPage actions={listAction}/>
            </I18n>
          </I18nTheme>
        </ApolloProvider>
      </MuiThemeProvider>
    )
  
    //console.log(dom.find(UserManagementPage).node.state)
    dom.find(AgGridReact).node.gridOptions.columnDefs[6].cellRendererParams.updateUser(user)
    jest.runTimersToTime(1000);
  })
  
  it('Testing componentDidMount()', () => {
    function callback() {
    
    }
    UserManagement.api = {}
    UserManagement.api.sizeColumnsToFit = () => null
    UserManagement.setState = (state, callback) => {if (callback) callback();}
    UserManagement.setState({}, callback)
    UserManagement.componentDidMount()
    expect(typeof UserManagement.state.rowData).toEqual('object')
    expect(UserManagement.state.rowData).toEqual(data)
  })
  
  it('Testing createUser()', () => {
    let tempData = [
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
    ]
    
    function callback() {
      
    }
    
    UserManagement.api = {}
    UserManagement.api.setRowData = (tempList) => null
    UserManagement.setState = (state, callback) => {if (callback) callback();}
    UserManagement.setState({}, callback)
    UserManagement.createUser(user)
    expect(typeof UserManagement.state.rowData).toEqual('object')
    tempData.push(user)
    expect(UserManagement.state.rowData).toEqual(tempData)
  })
  
  it('Testing mapStateToProps()', () => {
    const state = {
      i18nState: {
        lang: {}
      },
      user: {},
      home: true
    }
    
    expect(mapStateToProps(state)).toEqual({
      lang: {},
      user: {},
      home: true
    })
  })
  
  it('Testing mapDispatchToProps()', () => {
    const dispatch = () => null;
    expect(typeof mapDispatchToProps(dispatch)).toEqual('object')
    expect(Object.keys(mapDispatchToProps(dispatch).actions).length).toEqual(8)
  })
  
  it('Testing componentWillReceiveProps() with changeable languages', () => {
    UserManagement.props.lang = 'en'
    let home;
    home = {
      menuOpened: true
    };
    UserManagement.props.home = home
    UserManagement.api = {}
    UserManagement.api.sizeColumnsToFit = () => null
    UserManagement.componentWillReceiveProps({
      lang: 'vie',
      home: {
        menuOpened: false
      }
    })
    jest.runTimersToTime(1000);
    
  })
  
  it('Testing componentWillReceiveProps() with changeable themes', () => {
    UserManagement.props.lang = 'en'
    let home;
    home = {
      menuOpened: true
    };
    UserManagement.props.home = home
    UserManagement.api = {}
    UserManagement.api.sizeColumnsToFit = () => null
    UserManagement.componentWillReceiveProps({
      lang: 'en',
      home: {
        menuOpened: false
      }
    })
    jest.runTimersToTime(1000);
    
  })
  
  it('Testing componentWillReceiveProps() with nothing changed', () => {
    UserManagement.props.lang = 'en'
    let home;
    home = {
      menuOpened: true
    };
    UserManagement.props.home = home
    UserManagement.api = {}
    UserManagement.api.sizeColumnsToFit = () => null
    UserManagement.componentWillReceiveProps({
      lang: 'en',
      home: {
        menuOpened: true
      }
    })
    jest.runTimersToTime(1000);
    
  })
  
})
