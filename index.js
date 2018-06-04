const React = require('react');

const formComponents = { MultilineTextField, SectionSubtitle, FileUpload, FormTextField, RadioButton, Checkbox, Paragraph, FormDropdown } = require('./components'); 

const convertComponents = components => {
  const newComponents = components.map((component, idx) => {
    if (component && component.properties) {
      const Component = formComponents[component.type];
      return (<Component attributes={component.properties.attributes} id={idx} />);
    }
    return component;
  });
  return newComponents;
};

module.exports = {
  formComponents: formComponents,
  convertComponents: convertComponents,
}
