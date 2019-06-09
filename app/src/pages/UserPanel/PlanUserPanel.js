import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class PlanUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'plan'}
                    prompt={'Manage your subscription'}
                >

                </UserPanel>
            </React.Fragment>

        );
    }
}

export default PlanUserPanel;