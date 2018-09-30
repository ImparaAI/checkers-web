A Lumen/React web site for playing checkers against an AI.

This was built to work in conjunction with the [prediction app](https://github.com/ImparaAI/checkers-prediction) and can easily be run in a Kubernetes cluster [here](https://github.com/ImparaAI/checkers-kubernetes). The web app communicates to the prediction app within the cluster. From the web UI you can create new training sessions, view previous training sessions, and play against the current AI.

After setting up the Kubernetes cluster, you can set a `domain` value in the [`values.yaml`](https://github.com/ImparaAI/checkers-kubernetes/blob/master/values.example.yaml) file under `web`. Point that domain to localhost on your device and navigate there in your browser.

# Development

Developing in the Kubernetes cluster requires adding  `development_volume` value to your `values.yaml` file in the [imparaai/checkers-kubernetes](https://github.com/ImparaAI/checkers-kubernetes) repo an example of which can be seen in the `web` section of the [`values.example.yaml`](https://github.com/ImparaAI/checkers-kubernetes/blob/master/values.example.yaml) file.

## Setup

Exec into the web container in the Kubernetes cluster and you should be dumped onto `/var/www`. From here, run the following:

```bash
composer install
yarn install
```

This will build the PHP and JS build dependencies.

To build:

```bash
npm run build
```

Build on any file changes:

```bash
npm run watch
```

To test:

```bash
npm run test
```