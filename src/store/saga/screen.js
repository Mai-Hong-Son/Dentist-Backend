import { all, takeEvery } from 'redux-saga/effects';

// function requestToggleDrawer({ isOpen }) {
//     getNavigator().toggleDrawer({
//         side: 'left',
//         // the side of the drawer since you can have two, 'left' / 'right'
//         animated: true,
//         // does the toggle have transition animation or does it happen immediately (optional)
//         to: isOpen ? 'open' : 'closed'
//         // optional, 'open' = open the drawer, 'closed' = close it,
//         // missing = the opposite of current state
//     });
// }

export default [
    function* screenWatcher() {
        yield all([
            // takeEvery('screen/toggleDrawer', requestToggleDrawer),
        ]);
    }
];
