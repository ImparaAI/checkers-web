<?php

if (!function_exists('versioned_asset_url'))
{
	function versioned_asset_url(string $filename, $manifestDirectory = '/js/build')
	{
		if (!file_exists($manifestPath = app()->basePath('public/' . $manifestDirectory . '/manifest.json')))
			return $manifestDirectory . '/' . $filename;

		$manifest = (array) json_decode(file_get_contents($manifestPath), true);

		if ($versionedFilename = array_get($manifest, $filename))
		{
			return $manifestDirectory . $versionedFilename;
		}

		return $manifestDirectory . '/' . $filename;
	}
}