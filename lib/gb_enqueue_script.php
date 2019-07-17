<?php
/**
 * define namespace
 */
namespace Gute_Blog\RedQ_Listify;
/**
 * define ABSPATH
 */
defined('ABSPATH') || exit();

/**
 * Enqueue block editor only JavaScript and CSS.
 */
add_action('enqueue_block_editor_assets', __NAMESPACE__.'\enqueue_block_editor_assets');
function enqueue_block_editor_assets() {
	$block_path = '/assets/js/editor.blocks.js';
	$style_path = '/assets/css/blocks.editor.css';
	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'guteblog-redq-editor-js',
		_get_plugin_url() . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-data' ],
		false,
		true
		// filemtime( _get_plugin_directory() . $block_path )
	);
	// Enqueue optional editor only styles
	wp_enqueue_style(
		'guteblog-redq-editor-css',
		_get_plugin_url() . $style_path,
		[ ]
		// filemtime( _get_plugin_directory() . $style_path )
	);
}


/**
 * Enqueue front end and editor JavaScript and CSS assets.
 */
add_action('enqueue_block_assets', __NAMESPACE__.'\enqueue_assets');
function enqueue_assets() {
	$style_path = '/assets/css/blocks.style.css';
	wp_enqueue_style(
		'guteblog-redq',
		_get_plugin_url() . $style_path,
		null
		// filemtime( _get_plugin_directory() . $style_path )
	);
}


/**
 * Enqueue frontend JavaScript and CSS assets.
 */
add_action('enqueue_block_assets', __NAMESPACE__.'\enqueue_frontend_assets');
function enqueue_frontend_assets() {
	if ( is_admin() ) {
		return;
	}
	$block_path = '/assets/js/frontend.blocks.js';
	wp_enqueue_script(
		'guteblog-redq-frontend',
		_get_plugin_url() . $block_path,
		[]
		// filemtime( _get_plugin_directory() . $block_path )
	);
}

add_action( 'init', __NAMESPACE__.'\guteblog_dynamic_post_block' );

function guteblog_dynamic_post_block() {
	register_block_type( 'guteblog/mydynamicpost', array(
		'editor_script' => 'guteblog-redq-editor-js',
		'render_callback' => __NAMESPACE__.'\guteblog_dynamic_post_block_callback'
	) );
}

function guteblog_dynamic_post_block_callback( $attributes, $content ) {	
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => $attributes && $attributes['numberOfPost'] ? $attributes['numberOfPost'] : 2,
        'post_status' => 'publish',
		) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
		}
		$output = '';
		foreach ($recent_posts as $recent_post) {
			$output .= '<div class="posts-class">';
				$output .= '<a href="'.esc_url( get_permalink($recent_post['ID']) ).'">'.$recent_post['post_title'].'</a>';
			$output .= '</div>';
		}
		return $output;
}
 






// ..................................................................................
// ....................................... old code .................................
// ..................................................................................

// if (!function_exists('Gute_Blog_Init')){
//   function Gute_Blog_Init() {
//     // register block-building scripts
//     wp_register_script(
//       'guteblog-myfirstguteblog-editor',
//       // plugins_url( 'guteblog.js', __FILE__ ),
//       plugins_url( 'build/index.js', __FILE__ ),
//       array('wp-blocks', 'wp-i18n','wp-element', 'wp-editor'),
//       filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
//     );

//     // register global block css
//     wp_register_style(
//       'guteblog-myfirstguteblog-global',
//       plugins_url( 'src/guteblog.css', __FILE__ ),
//       array('wp-edit-blocks'),
//       filemtime(plugin_dir_path(__FILE__).'src/guteblog.css')
//     );

//     // register editor block css
//     wp_register_style(
//       'guteblog-myfirstguteblog-editor',
//       plugins_url( 'src/guteblog-editor.css', __FILE__ ),
//       array('wp-edit-blocks'),
//       filemtime(plugin_dir_path(__FILE__).'src/guteblog-editor.css')
//     );

//     // register block type
//     register_block_type('guteblog/myfirstguteblog', array(
//       'editor_script' => 'guteblog-myfirstguteblog-editor',
//       'editor_style'  => 'guteblog-myfirstguteblog-editor',
//       'style'         => 'guteblog-myfirstguteblog-global',
//     ));
//   }

//   // Hook to WordPress
//   add_action( 'init', 'Gute_Blog_Init');
// }