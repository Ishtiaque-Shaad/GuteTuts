import React, { Fragment } from 'react';

class GuteRepeater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.data || [{ title: '', content: '' }],
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleDeleteField = this.handleDeleteField.bind(this);
  }

  handleTitle(idx, event) {
    const newTitle = this.state.values.map((value, sidx) => {
      if (idx !== sidx) return value;
      return { ...value, title: event.target.value };
    });
    this.setState({ values: newTitle });
  }

  handleContent(idx, event) {
    const newContent = this.state.values.map((value, sidx) => {
      if (idx !== sidx) return value;
      return { ...value, content: event.target.value };
    });
    this.setState({ values: newContent });
  }

  handleAddField(values, e) {
    this.setState({
      values: this.state.values.concat([
        {
          title: '',
          content: '',
        },
      ]),
    });
  }

  handleDeleteField(idx) {
    this.setState({
      values: this.state.values.filter((s, sidx) => idx !== sidx),
    });
  }

  render() {
    const { values } = this.state;
    const { update } = this.props;
    if (values && values.title !== '' && values.content !== '') update(values);
    return (
      <Fragment>
        <h4>Repeat Fields</h4>
        {values.map((singleValue, idx) => {
          return (
            <div key={idx}>
              <input
                class="title"
                type="text"
                placeholder={`title #${idx + 1}`}
                value={singleValue.title}
                onChange={e => this.handleTitle(idx, e)}
              />
              <input
                class="content"
                type="textarea"
                placeholder={`content #${idx + 1}`}
                value={singleValue.content}
                onChange={e => this.handleContent(idx, e)}
              />
              <button
                type="button"
                className="small"
                onClick={() => this.handleDeleteField(idx)}
              >
                Delete Field
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className="small"
          onClick={e => this.handleAddField(values, e)}
        >
          Add Field
        </button>
      </Fragment>
    );
  }
}

export default GuteRepeater;
