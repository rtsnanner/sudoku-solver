import React from 'react'

/**
 * This class is responsible to exhibit a single sudoku locus using a state field to determine if it is readonly
 * It also allows to double click a locus and edit its value directily on sudoku board array
 */
export default class SudokuLocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };

        this
            .handleDbClick
            .bind(this);
    }

    finishEditing(evt) {
        let newValue = parseInt(evt.target.value, 10);

        if (newValue && newValue <= 9) {
            this
                .props
                .assignNewValue(this.props.index, newValue);
        } else {
            this
                .props
                .assignNewValue(this.props.index, 0);
        }

        this.setState({isEditing: false});
    }

    handleKeyPress(evt) {
        if (evt.key === 'Enter') {

            this.finishEditing(evt);
        }
    }

    handleChange(evt, stillediting) {

        this
            .props
            .assignNewValue(this.props.index, evt.target.value);

    }

    handleDbClick(evt) {
        if (!this.props.locked) {
            this.setState({isEditing: true});
        }

    }

    render() {
        if (this.state.isEditing) 
            return (
                <div className="col-4"><input
                    type="text"
                    style={{
                    width: "50px"
                }}
                    id={this.props.index}
                    name={`locus_${this.props.index}`}
                    value={this.props.value
                    ? this.props.value
                    : ""}
                    autoFocus
                    onBlur={(evt) => this.finishEditing(evt)}
                    onKeyPress={(evt) => this.handleKeyPress(evt)}
                    onChange={(evt) => this.handleChange(evt, false)}/></div>
            );
        else {

            let getNumberDisplay = () => {
                if (this.props.locked) {
                    return (
                        <strong>
                            {this.props.value
                                ? this.props.value
                                : '_'}
                        </strong>
                    );
                } else {

                    let style = {};

                    if (this.props.value && !this.props.valid) 
                        style.color = "red";
                    
                    return (
                        <span style={style}>
                            {this.props.value
                                ? this.props.value
                                : '_'}
                        </span>
                    );
                }
            };

            return (
                <div className="col-4" onDoubleClick={(evt) => this.handleDbClick(evt)}>
                    {getNumberDisplay()}
                </div>
            );

        }
    }
}