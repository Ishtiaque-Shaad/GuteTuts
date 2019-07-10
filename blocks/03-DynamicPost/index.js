const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;

export default registerBlockType('guteblog/mydynamicpost', {
  title: 'My Dynamic Post',
  icon: 'megaphone',
  category: 'common',
  attributes: {
    numberOfPost: {
      type: 'number',
      default: 2,
    },
  },
  edit: withSelect(select => {
    return {
      posts: select('core').getEntityRecords('postType', 'post'),
    };
  })(props => {
    const {
      posts,
      className,
      attributes: { numberOfPost },
      setAttributes,
    } = props;

    if (!posts) {
      return 'Loading...';
    }
    if (posts && posts.length === 0) {
      return 'No posts';
    }
    const handlePostNumber = e => {
      setAttributes({ numberOfPost: e.target.value });
    };

    return (
      <Fragment>
        {posts.map((singlePost, i) => {
          return (
            <div key={i}>
              <a className={className} href={singlePost.link}>
                {singlePost.title.rendered}
              </a>
            </div>
          );
        })}
        <InspectorControls>
          <input
            type="number"
            value={numberOfPost}
            onChange={handlePostNumber}
          />
        </InspectorControls>
      </Fragment>
    );
  }),
  save: () => {
    return null;
  },
});
