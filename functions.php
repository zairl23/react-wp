<?php

function asset_path($filename) {
  $dist_path = get_template_directory_uri() . '/dist/';
  $directory = dirname($filename) . '/';
  $file = basename($filename);
  
  return $dist_path . $directory . $file;
}

function load_scripts() {
	wp_enqueue_style('reactwp_css', asset_path('styles/main.css'), false, null);

  	wp_enqueue_script('jquery');
  	wp_enqueue_script('reactwp_lib_js', asset_path('scripts/libs.js'), [], null, true);
  	wp_enqueue_script('reactwp_js', asset_path('scripts/main.js'), [], null, true);
}

add_action('wp_enqueue_scripts', 'load_scripts', 100);