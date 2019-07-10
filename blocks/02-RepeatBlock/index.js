/**
 * Block dependencies
 */
import GuteRepeater from '../../components/GuteRepeat/index';
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { BaseControl } = wp.components;
const {
  RichText,
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
} = wp.editor;

/**
 * Register block
 */
const blockStyle = {
  backgroundColor: '#900',
  color: '#fff',
  padding: '20px',
};

function extend(obj, src) {
  Object.keys(src).forEach(function(key) {
    obj[key] = src[key];
  });
  return obj;
}

export default registerBlockType('guteblog/myrepeatfield', {
  title: 'My Repeat Field',
  icon: 'universal-access-alt',
  category: 'common',
  keywords: [__('testimonial'), __('feedback')],
  attributes: {
    repeat: {
      type: 'array',
      default: [],
    },
  },

  edit: props => {
    const { className, attributes, setAttributes } = props;
    const updateRepeatValue = value => {
      setAttributes({ repeat: value });
    };
    return (
      <div className={className}>
        <GuteRepeater
          data={attributes.repeat}
          update={value => updateRepeatValue(value)}
        />
      </div>
    );
  },
  save: props => {
    const {
      className,
      attributes: { repeat },
    } = props;
    return (
      <div className={className}>
        Hello Front End
        {repeat &&
          repeat.map((single, i) => {
            return (
              <div key={i}>
                <h2>{single.title}</h2>
                <p>{single.content}</p>
              </div>
            );
          })}
      </div>
    );
  },
});
