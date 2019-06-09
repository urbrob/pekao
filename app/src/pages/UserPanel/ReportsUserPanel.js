import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class ReportsUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'reports'}
                    prompt={'You can generate your reports here.'}
                >
                </UserPanel>
            </React.Fragment>

        );
    }
}

export default ReportsUserPanel;