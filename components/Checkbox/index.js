/**
 * Module dependencies
 */
const React = require('react');
const TextField = require('../../../../../components/TextField');

const withCommon = require('../../../../../hoc/form');
const TagsList = require('../../../../../components/TagsList');
const Checkbox = require('@andes/checkbox');

/**
 * FormCreator component
 */

const ManyComponents = props =>
  (
    <div className="container-title--field">
      <TextField valid={props.valid} keyValue="fieldTitle" error="Campo requerido" data-type="text" onChange={props.onFormChange} name="title" label="Titulo del campo" />
      <TagsList
        tags={props.tags}
        onChange={(e, tags) => props.onFormChange(e, tags)}
        label="Opciones"
        helper="Luego de cada opción presiona enter"
        name="tags"
        keyValue="tagList"
        autofocus={props.autofocus}
      />
    </div>
  );

const WithCommon = withCommon(ManyComponents);

class FormCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'checkbox';
  }

  state = {
    tags: [],
    autofocus: false,
    autofocusTxt: false,
    title: '',
  };

  handleChange = (e, tags) => {
    let type;
    if (tags) {
      this.props.onFormChange({
        tags,
      });
      this.setState({ tags, autofocus: true });
    } else {
      type = e.target.dataset.type;
      this.props.onFormChange({
        [e.target.name]: type === 'text' //eslint-disable-line
          ? e.target.value
          : e.target.checked,
      });
    }
  }

  renderEdit = () => (
    <div>
      <WithCommon title={this.props.title} valid={this.props.valid} name={this.name} attributes={this.props.attributes} onFormChange={(e, tags) => this.handleChange(e, tags)} tags={this.state.tags} autofocus={this.state.autofocus} />
    </div>
  );

  renderView = () => (
    <div className="form-view--components">
      <h2>{this.props.attributes.title}</h2>
      {this.props.attributes.tags.map(tag => (
        <Checkbox key={tag} label={tag} />
      ))}
    </div>
  );

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = FormCheckbox;

