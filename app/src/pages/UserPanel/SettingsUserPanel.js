import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class SettingsUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'settings'}
                    prompt={'Adjust your settings.'}
                >

                </UserPanel>
            </React.Fragment>

        );
    }
}
export default SettingsUserPanel;