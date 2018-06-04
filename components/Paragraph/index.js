/**
 * Module dependencies
 */
const React = require('react');
const { EditorState } = require('draft-js');
const { stateToHTML } = require('draft-js-export-html');
const { Editor } = require('react-draft-wysiwyg');


const withCommon = require('../../../../../hoc/form');
const es = require('../../../../../utils/paragraphI18n/es');

/**
 * Section subtitle component
 */

const WithCommon = withCommon();


class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'parrafo';
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  handleChange = (editorState) => {
    const content = stateToHTML(editorState.getCurrentContent());
    this.setState({
      editorState,
    });
    this.props.onFormChange({
      paragraph: content,
    });
  }

  renderEdit = () => {
    const { editorState } = this.state;
    return (
      <div className="section-subtitle--component">
        <WithCommon title={this.props.title} valid={this.props.valid} name={this.name} attributes={this.props.attributes} onFormChange={this.handleChange} />
        <div className="container-title--field">
          <div className="paragraph-container">
            <Editor
              editorState={editorState}
              wrapperClassName="paragraph-wrapper"
              onEditorStateChange={this.handleChange}
              toolbar={{
                options: ['inline', 'list', 'link'],
                list: {
                  options: ['unordered', 'ordered', 'indent', 'outdent'],
                },
                history: {
                  inDropdown: false,
                  options: ['undo', 'redo'],
                },
              }}
              localization={{
                locale: 'es',
                translations: es,
              }}
            />
          </div>
          {!this.props.valid ? <p className="invalid-text andes-form-control--invalid">Campo requerido</p> : '' }
        </div>
      </div>
    );
  }

  renderView = () => (
    <div className="form-view--components">
      <div dangerouslySetInnerHTML={{ __html: this.props.attributes.paragraph }} className="form-paragraph--section" />
    </div>
  );

  render = () => (this.props.mode === 'edit' ? this.renderEdit() : this.renderView())
}

/**
 * Inject i18n context as props.
 */

module.exports = Paragraph;
