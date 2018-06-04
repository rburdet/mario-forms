/**
 * Module dependencies
 */
const React = require('react');
const TextField = require('@andes/textfield');

const Uploader = require('../../../../../components/Uploader');
const withCommon = require('../../../../../hoc/form');
const Collapsible = require('../../../../../components/Collapsible');
/**
 * FormCreator component
 */

const ManyComponents = props => (
  <div className="container-title--field">
    <TextField valid={props.valid} error="Campo requerido" onChange={props.onFormChange} name="title" label="Titulo del campo" />
  </div>
);

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'adjuntar archivo';
  }

  handleChange = (e) => {
    this.props.onFormChange({
      [e.target.name]: e.target.value,
    });
  }

  renderEdit = () => {
    const WithCommon = withCommon(ManyComponents);
    return (
      <div>
        <WithCommon title={this.props.title} valid={this.props.valid} name={this.name} attributes={this.props.attributes} onFormChange={this.handleChange} />
        <Collapsible trigger="Editar opciones avanzadas">
          <div className="advanced-options form-edit-component--name">
            <div className="advanced-options--container">
              <TextField multiline maxLength={180} type="text" onChange={this.handleChange} name="fileHint" className="file-hint" label="Texto de ayuda" />
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }

  renderView = () => {
    const allowProps = {
      required: this.props.attributes.required,
      hint: this.props.attributes.fileHint,
    };
    return (
      <div className="form-view--components">
        <label className="form__label">{this.props.attributes.title}</label>
        <Uploader {...allowProps} />
      </div>
    );
  };

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = FileUpload;

