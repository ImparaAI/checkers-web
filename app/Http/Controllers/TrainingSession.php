<?php namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use GuzzleHttp\RequestOptions;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Exception\ServerException;
use Laravel\Lumen\Routing\Controller as BaseController;

class TrainingSession extends BaseController
{
	public function create(Request $request)
	{
		$response = (new GuzzleClient)->post('http://prediction/training/session', [
			RequestOptions::JSON => ['secondsLimit' => $request->input('secondsLimit')]
		]);

		return response()->json(json_decode($response->getBody(), true));
	}

	public function getAll(Request $request)
	{
		$response = (new GuzzleClient)->get('http://prediction/training/sessions');

		return response()->json(json_decode($response->getBody()));
	}

}