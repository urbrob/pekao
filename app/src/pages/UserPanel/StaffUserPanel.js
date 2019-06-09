import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class StaffUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'staff'}
                    prompt={'Better control your employees.'}
                >
                </UserPanel>
            </React.Fragment>

        );
    }
}
export default StaffUserPanel;