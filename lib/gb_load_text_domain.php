<?php 
/**
 * define namespace
 */
namespace Gute_Blog\RedQ_Listify;
/**
 * define ABSPATH
 */
defined('ABSPATH') || exit();

add_action('init', __NAMESPACE__.'\guteblog_text_domain');
function guteblog_text_domain() {
	load_plugin_textdomain( 'guteblog', false, basename( __DIR__ ) . '/languages' );
}
