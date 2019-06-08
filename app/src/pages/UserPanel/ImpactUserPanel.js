import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class ImpactUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'impact'}
                    prompt={'Check your local market !'}
                >
                </UserPanel>
            </React.Fragment>

        );
    }
}
export default ImpactUserPanel;