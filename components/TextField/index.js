/**
 * Module dependencies
 */
const React = require('react');
const TextField = require('@andes/textfield');
const Tooltip = require('@andes/tooltip');


const Dropdown = require('@andes/dropdown');

const { DropdownItem } = Dropdown;

const withCommon = require('../../../../../hoc/form');
const Collapsible = require('../../../../../components/Collapsible');

/**
 * FormTextField component
 */

const Help = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <g fill="#CCC" fillRule="evenodd">
      <path d={`M8.667 9.885H7.422a27.453 27.453 0 0
          1-.005-.327c0-.403.067-.736.2-.996.134-.26.4-.553.801-.879.4-.325.64-.539.718-.64a.855.855
          0 0 0 .18-.527.889.889 0 0 0-.32-.686c-.213-.19-.5-.286-.861-.286-.349
          0-.64.1-.874.298-.235.199-.396.502-.484.909l-1.26-.157c.036-.582.285-1.077.745-1.484.46-.407
          1.065-.61 1.814-.61.788 0 1.415.205 1.88.617.466.412.698.891.698
          1.438 0 .303-.085.59-.256.86-.171.27-.536.638-1.096
          1.103-.29.241-.47.435-.54.581-.07.147-.102.409-.095.786zm-1.245 1.846v-1.372h1.372v1.372H7.422z` }
      />
      <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
    </g>
  </svg>
);
const ManyComponents = props => (
  <div className="textfield-container">
    <div className="container-title--field">
      <TextField valid={props.valid} error="Campo requerido" data-type="text" onChange={(e, params) => props.onFormChange(e, params)} name="title" className="multiline-title" label="Titulo del campo" />
    </div>
    <div className="container-title--field">
      <Dropdown label="Opciones" onChange={(e, params) => props.onFormChange('options', params)} >
        <DropdownItem value="text" primary="Texto libre" selected />
        <DropdownItem value="number" primary="Solo numeros" />
        <DropdownItem value="url" primary="URL" />
        <DropdownItem value="date" primary="Fecha" />
        <DropdownItem value="email" primary="E-mail" />
      </Dropdown>
    </div>
  </div>

);

class FormTextField extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'campo de texto';
  }

  handleChange = (e, params) => {
    let type;
    if (!params) {
      type = e.target.type;
      this.props.onFormChange({
        [e.target.name]: type === 'text' || type === 'textarea' //eslint-disable-line
          ? e.target.value
          : e.target.checked,
      });
    } else {
      this.props.onFormChange({ [e]: params });
    }
  }

  renderEdit = () => {
    const WithCommon = withCommon(ManyComponents);
    return (
      <div>
        <WithCommon title={this.props.title} valid={this.props.valid} name={this.name} attributes={this.props.attributes} onFormChange={(e, params) => this.handleChange(e, params)} />
        <Collapsible trigger="Editar opciones avanzadas">
          <div className="advanced-options form-edit-component--name">
            <div className="advanced-options--container">
              <Dropdown className="advanced-dropdown" label="Tipo de ayuda" name="helpType" onChange={(e, params) => this.handleChange('helpType', params)} >
                <DropdownItem value="helper" primary="Ayuda al pie" />
                <DropdownItem value="tooltip" primary="Tooltip" />
              </Dropdown>
              <TextField multiline maxLength={180} type="text" onChange={(e, params) => this.handleChange(e, params)} name="textHint" label="Texto de ayuda" />
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }

  renderView = () => {
    const allowProps = {
      label: this.props.attributes.title,
      required: this.props.attributes.required,
      type: this.props.attributes.options,
      helper: !this.props.attributes.required ? `Opcional.${this.props.attributes.textHint || ''}` : this.props.attributes.helpType !== 'tooltip' ? this.props.attributes.textHint : null, //eslint-disable-line
    };
    return (
      <div className="form-view--components">
        {this.props.attributes.helpType === 'tooltip' ?
          (<TextField {...allowProps} data-placeholder="">
            <Tooltip side="rightTop" title="Ayuda" content={this.props.attributes.textHint} >
              <Help />
            </Tooltip>
          </TextField>) :
          <TextField {...allowProps} data-placeholder="" />}
      </div>
    );
  };

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = FormTextField;
