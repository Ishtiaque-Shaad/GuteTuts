/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { BaseControl } = wp.components;

/**
 * Register block
 */
const blockStyle = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '20px',
};

export default registerBlockType('guteblog/myfirstguteblog', {
  title: 'My First GuteBlog',
  icon: 'universal-access-alt',
  category: 'common',
  attributes: {
    content: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
  },
  edit: props => {
    const {
      attributes: { content },
      setAttributes,
      className,
    } = props;
    const onChangeContent = newContent => {
      setAttributes({ content: newContent });
    };
    return (
      <div className={className}>
        <BaseControl id="textarea-1" label="Text" help="Enter some text">
          <RichText
            id="textarea-1"
            tagName="p"
            style={blockStyle}
            onChange={onChangeContent}
            value={content ? content : ''}
          />
        </BaseControl>
      </div>
    );
  },
  save: props => {
    return (
      <div className={props.className}>
        <RichText.Content
          className="front-gute"
          // style={blockStyle}
          tagName="p"
          value={props.attributes.content}
        />
      </div>
    );
  },
});
