import React, {Component} from 'react';
import UserPanel from '../../Components/UserPanel/UserPanel'

export class SummaryUserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserPanel
                    content={'summary'}
                    prompt={'Conclusions based on your data'}
                >
                </UserPanel>
            </React.Fragment>

        );
    }
}
export default SummaryUserPanel;