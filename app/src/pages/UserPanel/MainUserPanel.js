import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class MainUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'main'}>
                </UserPanel>
            </React.Fragment>

        );
    }
}
export default MainUserPanel;