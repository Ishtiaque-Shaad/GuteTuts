<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @author      Shaad (Ishtiaque-shaad)
 * @license     MIT
 * @version     1.0.0
 * 
 * Plugin Name: Gute_Blog
 * Plugin URI: #
 * Description: This is a Gutenberg block tutorial Plugin
 * Version: 1.0.0
 * Author URI: #
 * Text Domain: guteblog
 * Domain Path: /languages
*/

// declare namespace
namespace Gute_Blog\RedQ_Listify;

// declare ABSPATH
defined('ABSPATH') || exit();

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}


/**
 * Gets this plugin's URL.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;
	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}
	return $plugin_url;
}


// Enqueue JS and CSS
include __DIR__ . '/lib/gb_enqueue_script.php';

// load text domain
include __DIR__ . '/lib/gb_load_text_domain.php';
