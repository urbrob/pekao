import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class StatisticsUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'stats'}
                    prompt={'See basic sales statistics'}
                >
                </UserPanel>
            </React.Fragment>

        );
    }
}
export default StatisticsUserPanel;