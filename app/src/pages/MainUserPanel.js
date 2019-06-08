import React, {Component} from 'react';
import UserPanel from '../Components/UserPanel/UserPanel'
import Content from '../Components/UserPanel/MainContent'

export class MainUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel/>
                <Content/>
            </React.Fragment>

        );
    }
}
export default MainUserPanel;