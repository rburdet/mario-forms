/**
 * Module dependencies
 */
const React = require('react');
const TextField = require('@andes/textfield');
const Checkbox = require('@andes/checkbox');

const withCommon = require('../../../../../hoc/form');
const Collapsible = require('../../../../../components/Collapsible');
/**
 * FormCreator component
 */
// Ejemplo de como se pueden agregar varios components facilmente =)

const ManyComponents = props => (
  <div className="container-title--field">
    <TextField valid={props.valid} error="Campo requerido" data-type="text" onChange={props.onFormChange} name="title" className="multiline-title" label="Titulo del campo" />
  </div>
);

class MultilineTextField extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'campo de texto multilínea';
  }

  handleChange = (e) => {
    const type = e.target.dataset.type;
    this.props.onFormChange({
      [e.target.name]: type === 'text' //eslint-disable-line
        ? e.target.value
        : e.target.checked,
    });
  }

  renderEdit = () => {
    const WithCommon = withCommon(ManyComponents);
    return (
      <div>
        <WithCommon title={this.props.title} name={this.name} valid={this.props.valid} attributes={this.props.attributes} onFormChange={this.handleChange} />
        <Collapsible trigger="Editar opciones avanzadas">
          <div className="advanced-options form-edit-component--name">
            <Checkbox name="maxQuantity" onChange={this.handleChange} key={this.name} label="Limitar cantidad de caracteres" checked={this.props.attributes.maxQuantity} />
            <div className="advanced-options--container">
              <TextField data-type="text" type="number" onChange={this.handleChange} value={this.props.attributes.maxCharacters} name="maxCharacters" className="max-quantity" label="Cantidad máxima" />
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }

  renderView = () => {
    let allowProps = {
      label: this.props.attributes.title,
      required: this.props.attributes.required,
      helper: !this.props.attributes.required ? 'Opcional.' : null,

    };
    if (this.props.attributes.maxQuantity) {
      allowProps = { ...allowProps, ...{ maxLength: this.props.attributes.maxCharacters, countdown: true } };
    }
    return (
      <div className="form-view--components">
        <TextField {...allowProps} multiline />
      </div>
    );
  };

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = MultilineTextField;

