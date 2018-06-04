/**
 * Module dependencies
 */
const React = require('react');
const TextField = require('@andes/textfield');

const withCommon = require('../../../../../hoc/form');

/**
 * Section subtitle component
 */

class SectionSubtitle extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'subtitulo de sección';
  }

  handleChange = (e) => {
    this.props.onFormChange({
      [e.target.name]: e.target.value,
    });
  }

  renderEdit = () => {
    const WithCommon = withCommon();
    return (
      <div className="section-subtitle--component">
        <WithCommon title={this.props.title} valid={this.props.valid} name={this.name} attributes={this.props.attributes} onFormChange={this.handleChange} />
        <div className="container-title--field">
          <TextField multiline maxLength={180} valid={this.props.valid} error="Campo requerido" onChange={this.handleChange} name="title" label="Escribe el subtítulo" />
        </div>
      </div>
    );
  }

  renderView = () => {
    const allowProps = {
      title: this.props.attributes.title,
    };
    return (
      <div className="form-view--components">
        <div className="form-subtitle--section">
          <h3>{allowProps.title}</h3>
        </div>
      </div>
    );
  };

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = SectionSubtitle;

