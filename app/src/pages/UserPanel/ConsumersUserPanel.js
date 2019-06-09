import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class ConsumerUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'consumer'}
                    prompt={'Check on, on your customers.'}
                >

                </UserPanel>
            </React.Fragment>

        );
    }
}

export default ConsumerUserPanel;