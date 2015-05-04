<?php

function asset_path($filename) {
  $dist_path = get_template_directory_uri() . '/dist/';
  $directory = dirname($filename) . '/';
  $file = basename($filename);
  
  return $dist_path . $directory . $file;
}

function load_scripts() {
	if ( ! function_exists( 'json_get_url_prefix' ) ) {
		return;
	}

	wp_enqueue_style('reactwp_css', asset_path('styles/main.css'), false, null);

  	wp_enqueue_script('jquery');
  	wp_enqueue_script('reactwp_lib_js', asset_path('scripts/libs.js'), [], null, true);

  	wp_enqueue_script('reactwp_js', asset_path('scripts/main.js'), [], null, true);

  	$settings = array( 'root' => home_url( json_get_url_prefix() ), 'nonce' => wp_create_nonce( 'wp_json' ) );
  	wp_localize_script( 'reactwp_js', 'WP_API_Settings', $settings );
  	
}

function site_info(){
    $site_infos = array(
        "name" => get_bloginfo('name'),
        "description" => get_bloginfo('description'),
        "url" => get_bloginfo('url'),
    );
    return json_encode($site_infos, true);
}

add_action('wp_enqueue_scripts', 'load_scripts', 100);