<?php namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Exception\ServerException;
use Laravel\Lumen\Routing\Controller as BaseController;

class Prediction extends BaseController
{
	public function get(Request $request)
	{
		$client = new GuzzleClient;

		try
		{
			$response = $client->get('http://prediction/predict', [
				'query' => ['moves' => $request->input('moves')]
			]);

			$response = json_decode($response->getBody(), true);

			return response()->json(['move' => $response['prediction']]);
		}
		catch (ServerException $e)
		{
			return false;
		}

		return response()->json(['move' => [23, 18]]);
	}

}